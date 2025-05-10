
import React from 'react';
import { useState } from 'react';
import { PlotData } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CalendarIcon, CheckIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';

interface BookingModalProps {
  plot: PlotData | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: () => void;
}

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  visitDate: z.date().optional(),
  comments: z.string().optional(),
  govId: z.instanceof(File).optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingModal: React.FC<BookingModalProps> = ({ plot, isOpen, onClose, onBookingComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [govIdFile, setGovIdFile] = useState<File | null>(null);
  const { toast } = useToast();
  const totalSteps = 3;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      comments: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGovIdFile(e.target.files[0]);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    form.reset();
    setGovIdFile(null);
    setCurrentStep(1);
  };

  const onSubmit = async (values: BookingFormValues) => {
    if (!plot) return;
    
    setIsLoading(true);
    
    try {
      // Create the booking record
      const bookingData = {
        plot_id: plot.id,
        block_id: plot.block,
        plot_number: plot.number,
        booked_by: values.fullName,
        contact_info: values.email,
        phone: values.phone,
        visit_date: values.visitDate ? values.visitDate.toISOString() : null,
        note: values.comments || null
      };
      
      const { data: bookingResult, error: bookingError } = await supabase
        .from('plot_bookings')
        .insert(bookingData)
        .select('id')
        .single();
      
      if (bookingError) throw bookingError;

      // If government ID was uploaded, store it in Supabase Storage
      if (govIdFile && bookingResult?.id) {
        const fileExt = govIdFile.name.split('.').pop();
        const fileName = `${bookingResult.id}-govid.${fileExt}`;
        
        const { error: uploadError } = await supabase
          .storage
          .from('documents')
          .upload(fileName, govIdFile);
          
        if (uploadError) throw uploadError;
      }

      // Send admin notification email via edge function
      await fetch('/api/notify-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plot: plot,
          booking: {
            ...bookingData,
            id: bookingResult?.id
          },
          hasDocument: !!govIdFile
        }),
      });

      toast({
        title: 'Success!',
        description: `Plot ${plot.id} has been booked successfully.`,
      });
      
      onBookingComplete();
      onClose();
      resetForm();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to book plot. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!plot) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Book Plot {plot.id}</DialogTitle>
          <DialogDescription>
            Enter your details to book this plot. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {Array.from({length: totalSteps}, (_, i) => i + 1).map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep === step 
                    ? "bg-primary text-primary-foreground" 
                    : currentStep > step 
                      ? "bg-primary/80 text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > step ? <CheckIcon className="h-4 w-4" /> : step}
                </div>
                <span className="text-xs mt-1 text-muted-foreground">
                  {step === 1 ? 'Personal Info' : step === 2 ? 'Additional Details' : 'Review'}
                </span>
              </div>
            ))}
            
            <div className={cn(
              "h-1 flex-1 mx-2", 
              currentStep > 1 ? "bg-primary/70" : "bg-muted"
            )} style={{margin: "0 8px", position: "relative", top: "-14px"}}></div>
            <div className={cn(
              "h-1 flex-1 mx-2", 
              currentStep > 2 ? "bg-primary/70" : "bg-muted"
            )} style={{margin: "0 8px", position: "relative", top: "-14px"}}></div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="visitDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preferred Visit Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="govId">Government ID (Optional)</Label>
                  <Input
                    id="govId"
                    type="file"
                    accept="image/*, application/pdf"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload a copy of your government issued ID (passport, driver's license, etc.)
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any specific requirements or questions?" 
                          className="h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Booking Summary</h3>
                
                <div className="rounded-md bg-muted/50 p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-sm font-medium">Plot:</span>
                    <span className="text-sm">{plot.id} (Block {plot.block})</span>
                    
                    <span className="text-sm font-medium">Size:</span>
                    <span className="text-sm">{plot.size} sq.ft.</span>
                    
                    <span className="text-sm font-medium">Name:</span>
                    <span className="text-sm">{form.getValues().fullName}</span>
                    
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm">{form.getValues().email}</span>
                    
                    <span className="text-sm font-medium">Phone:</span>
                    <span className="text-sm">{form.getValues().phone}</span>
                    
                    {form.getValues().visitDate && (
                      <>
                        <span className="text-sm font-medium">Visit Date:</span>
                        <span className="text-sm">{format(form.getValues().visitDate, "PPP")}</span>
                      </>
                    )}
                    
                    {govIdFile && (
                      <>
                        <span className="text-sm font-medium">ID Document:</span>
                        <span className="text-sm">{govIdFile.name}</span>
                      </>
                    )}
                  </div>
                  
                  {form.getValues().comments && (
                    <>
                      <div className="border-t border-border my-2"></div>
                      <div>
                        <span className="text-sm font-medium">Comments:</span>
                        <p className="text-sm mt-1">{form.getValues().comments}</p>
                      </div>
                    </>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  By completing this booking, you agree to our terms and conditions.
                </p>
              </div>
            )}
            
            <div className="flex justify-between space-x-2 pt-4">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep} disabled={isLoading}>
                  Back
                </Button>
              )}
              
              {currentStep < totalSteps && (
                <Button 
                  type="button" 
                  onClick={() => {
                    // For step 1, validate required fields before proceeding
                    if (currentStep === 1) {
                      form.trigger(["fullName", "email", "phone"]).then(isValid => {
                        if (isValid) nextStep();
                      });
                    } else {
                      nextStep();
                    }
                  }}
                  className="ml-auto"
                >
                  Continue
                </Button>
              )}
              
              {currentStep === totalSteps && (
                <Button type="submit" disabled={isLoading} className="ml-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Booking"
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
