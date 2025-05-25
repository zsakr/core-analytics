import { auth, actionCodeSettings as defaultActionCodeSettings } from './firebase'
import { sendEmailVerification } from 'firebase/auth'

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY

export const emailService = {
  async sendVerificationEmail(user: any, customSettings?: any) {
    try {
      const settings = {
        ...defaultActionCodeSettings,
        ...customSettings,
        handleCodeInApp: true,
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/action`,
      }
      await sendEmailVerification(user, settings)
      return { success: true }
    } catch (error: any) {
      console.error('Error sending verification email:', error)
      return { success: false, error: error.message }
    }
  },

  async sendPaymentConfirmation(email: string, plan: string, firstName: string) {
    try {
      // Send payment confirmation email using Firebase's email API
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requestType: 'EMAIL_SIGNIN',
            email,
            returnOobLink: false,
            emailTemplate: {
              name: 'subscription_confirmation',
              parameters: {
                firstName,
                plan,
                supportEmail: 'support@v0.com',
                loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`
              }
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to send payment confirmation email')
      }

      console.log(`Payment confirmation email sent to ${email} for plan ${plan}`)
      return { success: true }
    } catch (error: any) {
      console.error('Error sending payment confirmation email:', error)
      return { success: false, error: error.message }
    }
  }
}
