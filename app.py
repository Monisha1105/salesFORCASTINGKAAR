from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import joblib
import statsmodels.api as sm
from statsmodels.tsa.statespace.sarimax import SARIMAX
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

@app.route('/sales-forecast', methods=['POST'])
def sales_forecast():
    file = request.files['file']
    val = request.form['timePeriod']
    value=int(val)
    plt.clf()
    forecast = generate_forecast(value,file)

    
   

    return jsonify({'result': 'success'})
def generate_forecast(value,file):
    # Load the data from CSV
    data = pd.read_csv(file, index_col='Date', parse_dates=['Date'])
    filename = "Prediction.xlsx"

# construct the file path using the current working directory
    file_path = os.path.join(os.getcwd(), filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"The file '{filename}' has been deleted.")
    else:
        print(f"The file '{filename}' does not exist.")

    # Select the endogenous variable
    endog = data['Sales']

    # Define the SARIMAX model
    model = SARIMAX(endog, order=(1, 1, 1), seasonal_order=(1, 1, 1, 24))

    # Fit the model
    results = model.fit()

    # Generate a forecast for the specified number of steps
    forecast = results.forecast(steps=value)
    fore=forecast.to_frame()
    fore.reset_index(inplace=True)
    fore.rename(columns={'index': 'date'}, inplace=True)

# Convert date column to datetime format
    fore['date'] = pd.to_datetime(fore['date'], unit='s')
    fore['date'] = fore['date'].dt.strftime('%d-%m-%Y')
    # fore.columns = ['Date']
    fore.columns = ['Date','Prediction']
    
    print("Forecast")
    print(fore)
    # forecast_df = forecast.tolist()
    # print(forecast_df)
    
    # Save the forecast dataframe to Excel
    
    fore.to_excel('Prediction.xlsx')
    plt.plot(endog.index, endog, label='Actual Sales',color='#0000FF')
    plt.plot(forecast.index, forecast, label='Forecast',color='#FF0000')
    if(value!=48):
        for i, j in zip(endog.index, endog):
            plt.text(i, j, str(j))
    
    plt.legend()
    path = 'src/assets/my_plot.png'
    plt.savefig(path, bbox_inches='tight')
    plt.show()
    

    # Return the forecast
    return forecast.tolist()

# Import Flask and create an instance of it


# Define a route for the forecast endpoint
# @app.route('/forecast', methods=['GET'])
# def forecast():
#     # Get the 'steps' query parameter from the request
#     steps = int(request.args.get('steps'))

#     # Generate the forecast for the specified number of steps
#     plt.clf()
#     forecast = generate_forecast(steps,file)
    
    

#     # Return the forecast as a JSON response
#     return jsonify(forecast=forecast)

if __name__=='__main__':
    app.run(debug=True)
