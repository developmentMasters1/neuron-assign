from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import pandas as pd
import numpy as np
from scipy.stats import norm

app = FastAPI()

# For example, if your frontend is served at http://localhost:3000, you would replace "*" with "http://localhost:3000"
origins = ["*"]

# Add the CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


def get_unique_channels():
    data = pd.read_csv("data.csv")
    return data["channel_id"].unique().tolist()


def get_metric_columns():
    data = pd.read_csv("data.csv")
    return list(data.columns[2:])


def get_filtered_data(channel_id: str, significant_metric: str):
    data = pd.read_csv("data.csv")
    data["ec_timestamp"] = pd.to_datetime(data["ec_timestamp"])
    data = data[data["channel_id"] == channel_id]
    latest_timestamp = data["ec_timestamp"].max()
    filtered_data = data[data["ec_timestamp"] >= (latest_timestamp - pd.Timedelta(minutes=10))]
    if significant_metric:
        filtered_data = filtered_data[["ec_timestamp", significant_metric]]
    return filtered_data.to_dict()


def get_filtered_metric(channel_id: str, metric: str):
    data = pd.read_csv("data.csv")
    data["ec_timestamp"] = pd.to_datetime(data["ec_timestamp"])
    data = data[data["channel_id"] == channel_id]
    latest_timestamp = data["ec_timestamp"].max()
    filtered_data = data[data["ec_timestamp"] >= (latest_timestamp - pd.Timedelta(minutes=10))]
    values = filtered_data[metric].values
    return values


def get_signficant_metrics(channel_id: str):
    # Get metric columns
    metric_columns = get_metric_columns()
    significant_metrics = []

    for col in metric_columns:
        values = get_filtered_metric(channel_id, col)
        mean, std_dev = np.mean(values), np.std(values)
        if std_dev == 0:
            continue  # Skip this metric if the standard deviation is zero
        z_scores = (values - mean) / std_dev
        p_values = 2 * (1 - norm.cdf(np.abs(z_scores)))
        significant = np.any(p_values < 0.05)  # Check if any value is significant at 95% confidence level
        if significant:
            significant_metrics.append(str(col))

    return significant_metrics


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/channels")
def get_channels():
    try:
        return {"success": True, "data": get_unique_channels()}
    except Exception as e:
        return {"success": False, "error": str(e)}


@app.get("/metrics")
def get_metrics(channel_id: Optional[str] = Query(None)):
    try:
        significant_metrics = get_signficant_metrics(channel_id)
        return {"success": True, "data": significant_metrics}

    except Exception as e:
        return {"success": False, "error": str(e)}


@app.get("/data/{channel_id}")
def get_data(channel_id: str, metric: Optional[str] = Query(None)):
    try:
        # Filter data for the selected channel ID
        filtered_data = get_filtered_data(channel_id, metric)

        return {"success": True, "data": filtered_data}

    except Exception as e:
        return {"success": False, "error": str(e)}
