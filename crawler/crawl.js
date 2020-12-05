const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  const detailsPage = await browser.newPage();
  await page.goto("http://anitsayac.com/");

  const hrefs = await page.evaluate(async () => {
    const hrefs = [];

    const rawHrefs = document.querySelectorAll("span.xxy a");

    for (let index = 0; index < rawHrefs.length; index++) {
      const anchor = rawHrefs.item(index).href;
      hrefs.push(anchor);
    }

    return hrefs;
  });

  const details = [];

  for (const href of hrefs) {
    try {
      console.log(`start crawling ${href}`);
      console.time(`crawling ${href}`);
      await detailsPage.goto(href);

      const detail = await detailsPage.evaluate(() => {
        const detail = {};
        for (let index = 0; index < document.body.childNodes.length; index++) {
          const node = document.body.childNodes[index];

          if (node.tagName == "BR") {
            const precedingNode = document.body.childNodes[index - 1];
            const headingNode = document.body.childNodes[index - 2];

            const content = precedingNode.textContent.trim();
            let head = headingNode.textContent
              .trim()
              .toLocaleLowerCase()
              .trim();
            head = head.slice(0, head.length - 1);
            switch (head) {
              case "ad soyad":
                detail.name = content;
                break;
              case "maktülün yaşı":
                detail.age = content;
                break;
              case "i̇l/ilçe":
                detail.location = content;
                break;
              case "tarih":
                const rawDate = content.replace(/\/|\./g).replace(/\D/g, "");
                const [d, m, y] = [
                  rawDate.slice(0, 2),
                  rawDate.slice(2, 4),
                  rawDate.slice(4, 8),
                ].map(Number);
                const date = new Date();
                date.setUTCHours(0,0,0,0);
                date.setUTCFullYear(y, m - 1, d);
                detail.date = date.toISOString();
                break;
              case "yıl":
                const onlyYear = new Date();
                onlyYear.setUTCHours(0,0,0,0);
                onlyYear.setUTCFullYear(Number(content), 0, 1);
                detail.date = onlyYear.toISOString();
                break;
              case "neden öldürüldü":
                detail.reason = content;
                break;
              case "kim tarafından öldürüldü":
                detail.murdered_by = content;
                break;
              case "korunma talebi":
                detail.safeguard_measures = content.toLowerCase() != "yok";
                break;
              case "öldürülme şekli":
                detail.how = content;
                break;
              case "failin durumu":
                detail.state_of_perpetrator = content;
                break;
              case "kaynak":
              case "":
                detail.source = content;
                break;
              case "notlar":
                detail.notes = content;
                break;
              default:
                throw new Error(
                  `Unexpected node: "${head}"\npreceded by:  ${precedingNode.textContent}\nsource: \n${document.body.innerHTML}`
                );
            }
          }
        }
        return detail;
      });
      console.timeEnd(`crawling ${href}`);
      details.push(detail);
    } catch (e) {
      console.error(`an error occurred while crawling ${href} at index ${details.length}`)
      fs.promises.writeFile("data.json", JSON.stringify(details, undefined, 4));
      throw e;
    }
    const progress = (100 / hrefs.length) * details.length;
    console.log(`progress: ${hrefs.length}/${details.length} ${progress}`);
  }
  fs.promises.writeFile("data.json", JSON.stringify(details, undefined, 4));
  browser.close();
})();
