To run the code : 
1. Clone/download the repository.
2. Open the project directory in the terminal.
3. Run the following commands in the terminal to run all tests :
   ```
   npm i
   npx codeceptjs run --steps
   ```
   To run a certain test only, use
    ```
    npx codeceptjs run {path to file} -- steps
    ```

Below are additional flags that can be used when running tests and their effects :
1. --features : run only Gherkin tests 
2. --tests : run only non-Gherkin tests
3. --ai : enables ai for self-healing tests and helping with writing tests during pause
4. --reporter {reporter_name} : enables using the reporter specified in reporter_name. Currently available reporters are the default reporter and Mochawesome (produces report in a HTML file inside the output folder).