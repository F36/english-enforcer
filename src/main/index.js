const { Telegraf } = require('telegraf')
const { EnforcerBot } = require('./bot')
const locale = require('./locale.en')
const { detectorFactory } = require('./detector')

const LanguageDetect = require('languagedetect')

const token = process.env.BOT_TOKEN;
const minProbabilityInPercents = 30;

const api = new Telegraf(token);
const languageDetect = new LanguageDetect();


const bot = new EnforcerBot(
    locale,
    detectorFactory(languageDetect, 'english', minProbabilityInPercents),
    api,
    'english',
    console
)

try {
    bot.launch()
} catch (e) {
    console.error(e)
}