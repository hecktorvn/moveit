import chrome from 'chrome-aws-lambda';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';

import { makeScreenshot } from './screenshot';

export default async function(options) {
    const {
      html,
      content,
      output,
      puppeteerArgs = {},
    } = options
  
    if (!html) {
      throw Error('You must provide an html property.')
    }
  
    let Cluster = puppeteer.launch();
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        Cluster = await puppeteerCore.launch({
            args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
            defaultViewport: chrome.defaultViewport,
            executablePath: await chrome.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
        });
    }
  

    let buffers = []
  
    await Cluster.task(async ({ page, data: { content, output } }) => {
      const buffer = await makeScreenshot(page, { ...options, content, output })
  
      buffers.push(buffer);
    });
  
    const shouldBatch = Array.isArray(content)
    const contents = shouldBatch ? content : [{ ...content, output }]
  
    contents.forEach(content => {
      const { output, ...pageContent } = content
      Cluster.queue({ output, content: pageContent })
    })
  
    await Cluster.idle();
    await Cluster.close();
  
    return shouldBatch ? buffers : buffers[0]
}
  
  