const express = require('express');
const cors = require('cors');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({ apikey: process.env.WATSON_APIKEY }),
  serviceUrl: process.env.WATSON_URL,
});

let sessionId;
async function createSession() {
  const res = await assistant.createSession({ assistantId: process.env.WATSON_ASSISTANT_ID });
  sessionId = res.result.session_id;
}
createSession();

app.post('/chat', async (req,res) => {
  try {
    const response = await assistant.message({
      assistantId: process.env.WATSON_ASSISTANT_ID,
      sessionId: sessionId,
      input: { message_type: 'text', text: req.body.message }
    });
    res.json({reply: response.result.output.generic[0].text});
  } catch(err) {
    res.json({reply: "Arre bhai server me dikkat aa gayi. Thodi der me try kar"});
  }
});

app.listen(process.env.PORT, () => console.log(`Server chal gaya: http://localhost:${process.env.PORT}`));