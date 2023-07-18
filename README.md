This is [Flowsistant](https://devfolio.co/projects/flowsistant-007a) API with web interface made with Next.js and GPT-3.5 Turbo.


## Run dev

To run development server, you need to have OpenAI API key in `.env` file like this:

`OPENAI_API_KEY=*your API key*`

then use


```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test
Paste any transaction on the `/tx-ask` page to see API in action

Use `0x0b2a3299cc857e01` address somewhere in the transaction to trigger scam alarm

Use `0x0b2a3299cc857e00` address somewhere in the transaction to trigger compromised contract alarm

Use `TopShot` import with any random address to trigger import mismatch warning

To test linking hints, you can use transaction from `lib/txForge.ts`, switch AuthAccounts of children and parent to get hint or warning about losing an account





