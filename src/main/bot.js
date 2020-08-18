class EnforcerBot {
    constructor(locale, detector, api, expectedLanguage, logger) {
        this.locale = locale;
        this.detector = detector;
        this.api = api;
        this.logger = logger;
        this.expectedLanguage = expectedLanguage;

        this.onStart = this.onStart.bind(this);
        this.onHelp = this.onHelp.bind(this);
        this.onText = this.onText.bind(this);

        this.init();
    }

    onStart(ctx) {
        ctx.reply(this.locale.start)
    }

    onHelp(ctx) {
        ctx.reply(this.locale.help)
    }

    onText(ctx) {
        const result = this.detector(ctx.message.text)
        if (!result) {
            this.logger.error('Can not define language of message,', ctx.message);
            return
        }
        const [language, probability] = result
        if (language === this.expectedLanguage) {
            return;
        }

        ctx.reply(this.locale.message)
        if (typeof probability === 'number' &&  Math.abs(probability) !== Infinity) {
            ctx.reply(`I am ${Math.floor(probability * 100)}% sure that you are speaking ${language}`);
        }  
    }

    init() {
        this.api.start(this.onStart);
        this.api.help(this.onHelp);
        this.api.on('text', this.onText);
    }

    launch() {
        this.api.launch();
    }
}

module.exports = {
    EnforcerBot
}
