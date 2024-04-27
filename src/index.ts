import { ElevenLabsClient } from 'elevenlabs';
import fs from 'fs';

// Initialize ElevenLabs client
const elevenlabs = new ElevenLabsClient({
  apiKey: 'YOUR_API_KEY'
});

// Function to create a pronunciation dictionary from a file
async function createPronunciationDictionary() {
  const fileStream = fs.createReadStream('/path/to/pronunciation/file.pls');
  const dictionary = await elevenlabs.pronunciationDictionary.addFromFile(fileStream, {
    name: 'TomatoPronunciation'
  });
  console.log('Dictionary created:', dictionary);
  return dictionary.id;
}

// Function to play the word "Tomato" using a specific voice and dictionary
async function playTomatoWithDictionary(voiceId: string, dictionaryId: string) {
  const audio = await elevenlabs.generate({
    voiceId: voiceId,
    text: 'Tomato',
    pronunciation_dictionary_ids: [dictionaryId]
  });
  console.log('Playing Tomato with dictionary...');
  // Assuming play is a function that can play the audio stream
  // play(audio);
}

// Function to remove a rule from the pronunciation dictionary
async function removeRule(dictionaryId: string, ruleId: string) {
  await elevenlabs.pronunciationDictionary.removeRulesFromThePronunciationDictionary(dictionaryId, {
    rule_strings: [ruleId]
  });
  console.log('Rule removed');
}

// Function to play the word "Tomato" using a specific voice without a dictionary
async function playTomato(voiceId: string) {
  const audio = await elevenlabs.generate({
    voiceId: voiceId,
    text: 'Tomato'
  });
  console.log('Playing Tomato without dictionary...');
  // play(audio);
}

// Function to add rules to the pronunciation dictionary
async function addRule(dictionaryId: string, ruleId: string) {
  await elevenlabs.pronunciationDictionary.addRulesToThePronunciationDictionary(dictionaryId, {
    rules: [ruleId]
  });
  console.log('Rule added');
}

// Main function to perform the tasks
async function main() {
  const dictionaryId = await createPronunciationDictionary();
  const voiceId = 'rachel';

  // Play "Tomato" with the dictionary
  await playTomatoWithDictionary(voiceId, dictionaryId);

  // Remove the rule from the dictionary and play "Tomato" without the dictionary
  await removeRule(dictionaryId, 'tomato');
  await playTomato(voiceId);

  // Add the rule back to the dictionary and play "Tomato" with the dictionary again
  await addRule(dictionaryId, 'tomato');
  await playTomatoWithDictionary(voiceId, dictionaryId);
}

// Run the main function
main().catch(console.error);
