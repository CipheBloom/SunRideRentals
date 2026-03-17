interface BookingDetails {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  bikeName: string;
  bikeCategory: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
}

// Direct WhatsApp message service (no API required)
export class EmailService {
  private static readonly ADMIN_PHONE = '+918471909282'; // Admin phone number with country code

  static async sendBookingConfirmation(booking: BookingDetails): Promise<void> {
    console.log('📱 Starting WhatsApp message sending process...');
    console.log('👤 User:', booking.userName);
    console.log('📧 User Email:', booking.userEmail);
    console.log('📞 User Phone:', booking.userPhone);
    console.log('🛵 Scooty:', booking.bikeName);
    console.log('💰 Price:', booking.totalPrice);
    console.log('📅 Dates:', booking.startDate.toLocaleDateString(), 'to', booking.endDate.toLocaleDateString());
    
    try {
      // Generate WhatsApp message content
      const userMessage = this.generateUserWhatsAppMessage(booking);
      const adminMessage = this.generateAdminWhatsAppMessage(booking);
      
      // Send WhatsApp message to user directly
      console.log('📤 Opening WhatsApp to send confirmation message to user...');
      await this.openWhatsAppDirect(
        booking.userPhone,
        userMessage
      );
      
      // Send WhatsApp message to admin directly
      console.log('📤 Opening WhatsApp to send alert message to admin...');
      await this.openWhatsAppDirect(
        this.ADMIN_PHONE,
        adminMessage
      );
      
      console.log('🎉 WhatsApp messages opened successfully!');
      
    } catch (error) {
      console.error('❌ ERROR: Failed to open WhatsApp messages');
      console.error('🔍 Error details:', error);
      console.error('📊 Booking ID:', booking.id);
      console.error('👤 User:', booking.userName, '(', booking.userEmail, ')');
      
      // Fallback to console logging
      console.log('🔄 Falling back to console confirmation...');
      console.log('✅ Booking confirmed successfully!');
    }
  }

  private static async openWhatsAppDirect(phoneNumber: string, message: string): Promise<void> {
    try {
      // Format phone number (remove any non-digits except +)
      const formattedPhone = phoneNumber.replace(/[^\d+]/g, '');
      
      // Ensure phone number starts with country code
      const fullPhoneNumber = formattedPhone.startsWith('+') ? formattedPhone : `+91${formattedPhone}`;
      
      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${fullPhoneNumber.replace('+', '')}?text=${encodedMessage}`;
      
      console.log('📱 WhatsApp Message Details:');
      console.log('📞 To:', fullPhoneNumber);
      console.log('📝 Message:', message.substring(0, 100) + '...');
      console.log('🔗 URL:', whatsappUrl);
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank', 'width=600,height=800');
      
      // Wait a moment for the window to open
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('✅ WhatsApp opened successfully');
      
    } catch (error) {
      console.error('❌ Failed to open WhatsApp:', error);
      throw error;
    }
  }

  private static generateUserWhatsAppMessage(booking: BookingDetails): string {
    const startDate = booking.startDate.toLocaleDateString();
    const endDate = booking.endDate.toLocaleDateString();
    
    return `🛵 *SunRide Rentals - Booking Confirmed!*

Dear ${booking.userName},

Your scooty booking has been confirmed successfully! 

📋 *Booking Details:*
• Booking ID: ${booking.id}
• Scooty: ${booking.bikeName} (${booking.bikeCategory})
• Duration: ${startDate} to ${endDate}
• Total Price: ₹${booking.totalPrice}

💳 *Payment:* Please complete payment at pickup time.

📍 *Pickup:* Bring valid ID and this confirmation.

Thank you for choosing SunRide Rentals! 🛵

For any queries: Call us at +91 9876543210`;
  }

  private static generateAdminWhatsAppMessage(booking: BookingDetails): string {
    const startDate = booking.startDate.toLocaleDateString();
    const endDate = booking.endDate.toLocaleDateString();
    
    return `🚨 *New Booking Alert - SunRide Rentals*

👤 *Customer Information:*
• Name: ${booking.userName}
• Email: ${booking.userEmail}
• Phone: ${booking.userPhone}

🛵 *Booking Details:*
• Booking ID: ${booking.id}
• Scooty: ${booking.bikeName} (${booking.bikeCategory})
• Duration: ${startDate} to ${endDate}
• Total Price: ₹${booking.totalPrice}

⏰ *Booked on:* ${booking.createdAt.toLocaleDateString()}

Please check admin dashboard for more details.`;
  }
}
