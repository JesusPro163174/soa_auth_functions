const sgMail = require('@sendgrid/mail');
export  class Email{
    
    private emailClient:string;
    private key:string;
    private msg:any = {};
    private emailServer:string;
    
    constructor(emailClient:string){
        this.emailClient = emailClient;
        this.key = "";
        this.emailServer = "163174@ids.upchiapas.edu.mx";
        this.buildMsg();
        this.setSendEmailKey();
    }

    private buildMsg(){
        this.msg = {
            to: this.emailClient,
            from: this.emailServer,
            subject: 'Actividad Email',
            text: 'Jesus Alberto Gonzalez Gutierrez 163174',
            html: 'hola ${email} gracias por registrarte'
        };
    }

    private setSendEmailKey(){
        sgMail.setApiKey(this.key);
    }

    public sendEmail(){
        sgMail.send(this.msg);
    }
}