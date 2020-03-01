const MIN_LISTENING_CONFIDENCE = 0.75

const SRConstructor = window.SpeechRecognition || window.webkitSpeechRecognition

export function hasSpeechRecognition() {
  return SRConstructor != null
}

export function listenForWord(onWord) {
  const reco = new SRConstructor()
  reco.lang = 'fr-FR'
  reco.interimResults = true
  reco.onresult = function handleSpeechResult({ results }) {
    const { confidence, transcript } = results[0][0]
    if (confidence >= MIN_LISTENING_CONFIDENCE) {
      onWord(transcript)
    }
  }
  reco.start()
}

export function speak(letter, { onEnd, onStart, rate = 0.75 } = {}) {
  const voice = speechSynthesis
    .getVoices()
    .find(({ voiceURI }) => voiceURI === 'Thomas')
  const utterance = new SpeechSynthesisUtterance(letter)
  utterance.lang = 'fr-FR'
  utterance.onstart = onStart
  utterance.onend = onEnd
  utterance.rate = rate
  utterance.voice = voice
  speechSynthesis.speak(utterance)
}
