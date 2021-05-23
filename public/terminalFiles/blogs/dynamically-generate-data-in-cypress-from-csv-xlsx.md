---
title: "Dynamically generate data in Cypress from CSV/XLSX"
date: "2019-09-29"
---

A quick walkthrough on how to use data from Excel spreadsheets or CSV files, in order to dynamically generate multiple Cypress tests.

We are going to use a 2 column table witht username & password for our example, but in reality this could be any data. We have the following table in `csv` & `xlsx` format.

<table class=""><tbody><tr><td><strong>username</strong></td><td><strong>password</strong></td></tr><tr><td>User1</td><td>Password1</td></tr><tr><td>User2</td><td>Password2</td></tr><tr><td>User3</td><td>Password3</td></tr><tr><td>User4</td><td>Password4</td></tr><tr><td>User5</td><td>Password5</td></tr><tr><td>User6</td><td>Password6</td></tr><tr><td>User7</td><td>Password7</td></tr><tr><td>User8</td><td>Password8</td></tr><tr><td>User9</td><td>Password9</td></tr><tr><td>User10</td><td>Password10</td></tr></tbody></table>

And we are going to login into the following [page](https://the-internet.herokuapp.com/login)

![](https://you54f.files.wordpress.com/2019/09/screenshot-2019-09-30-at-00.11.34.png?w=1024)

[https://the-internet.herokuapp.com/login](https://the-internet.herokuapp.com/login)

First we need to convert our XLSX file to JSON with [https://github.com/SheetJS/js-xlsx](https://github.com/SheetJS/js-xlsx)

```
import { writeFileSync } from "fs";
import * as XLSX from "xlsx";
try {
  const workBook = XLSX.readFile("./testData/testData.xlsx");
  const jsonData = XLSX.utils.sheet_to_json(workBook.Sheets.testData);
  writeFileSync(
    "./cypress/fixtures/testData.json",
    JSON.stringify(jsonData, null, 4),
    "utf-8"
  );
} catch (e) {
  throw Error(e);
}
```

or CSV file to JSON with [https://www.papaparse.com/](https://www.papaparse.com/)

```
import { readFileSync, writeFileSync } from "fs";
import { parse } from "papaparse";
try {
  const csvFile = readFileSync("./testData/testData.csv", "utf8");
  const csvResults = parse(csvFile, {
    header: true,
    complete: csvData => csvData.data
  }).data;
  writeFileSync(
    "./cypress/fixtures/testDataFromCSV.json",
    JSON.stringify(csvResults, null, 4),
    "utf-8"
  );
} catch (e) {
  throw Error(e);
}
```

In our cypress test file, we are going to

1. Import our generated JSON file into `testData`
2. Loop over each `testDataRow`, inside the `describe` block, and set the `data` object with our username & password
3. Setup a mocha `context` with a dynamically generated title, unique for each data row
4. A single test is written inside the `it` block using our `data` attributes, this will be executed as 10 separate tests

```
import { login } from "../support/pageObjects/login.page";
const testData = require("../fixtures/testData.json");
describe("Dynamically Generated Tests", () => {
  testData.forEach((testDataRow: any) => {
    const data = {
      username: testDataRow.username,
      password: testDataRow.password
    };
    context(`Generating a test for ${data.username}`, () => {
      it("should fail to login for the specified details", () => {
        login.visit();
        login.username.type(data.username);
        login.password.type(`${data.password}{enter}`);
        login.errorMsg.contains("Your username is invalid!");
        login.logOutButton.should("not.exist");
      });
    });
  });
});
```

![](https://you54f.files.wordpress.com/2019/09/screenshot-2019-09-30-at-00.31.50.png?w=1024)

Voila - Dynamically generated tests from Excel or CSV files! Enjoy

You can extend this further by

- Manipulating the data in the test script, prior to using it in your test such as shifting date of birth by an offset
- Having different outcomes in your test or running different assertions based on a parameter in your test data file.

A full working example can be downloaded here:- [https://github.com/YOU54F/cypress-dynamic-data](https://github.com/YOU54F/cypress-dynamic-data)

`git clone git@github.com:YOU54F/cypress-docker-typescript.git`

`yarn install`

To convert Excel files to JSON

`make convertXLStoJSON` or `npm run convertXLStoJSON`

- File:- `testData/convertXLStoJSON.ts`
- Input:- `testData/testData.xlsx`
- Output:- `cypress/fixtures/testData.json`

To convert CSV to JSON

`make convertCSVtoJSON` or `yarn run convertCSVtoJSON`

- File:- `testData/convertCSVtoJSON.ts`
- Input:- `testData/testData.csv`
- Output:- `cypress/fixtures/testDataFromCSV.json`

To see the test in action

- `export CYPRESS_SUT_URL=https://the-internet.herokuapp.com`
- `npx cypress open --env configFile=development` or `make test-local-gui`

Open the script `login.spec.ts` which will generate a test for every entry in the CSV or XLS (default) file.

If you wish to read from the CSV, in the file `cypress/integration/login.spec.ts`

Change `const testData = require("../fixtures/testData.json");` to

`const testData = require("../fixtures/testDataFromCSV.json");`
