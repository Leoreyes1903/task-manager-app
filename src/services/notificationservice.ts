export class NotificationService {
  private static instance: NotificationService;

  private constructor() {
    console.log('🔧 Instancia de NotificationService creada');
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public sendNotification(message: string) {
    console.log(`📩 Notificación: ${message}`);
    // Aquí podrías usar nodemailer, Twilio, etc.
  }
}