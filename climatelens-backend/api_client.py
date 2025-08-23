
import os
import httpx

BASE = "https://api.envirotrust.eu"

async def _get(path, params=None, stream=False):
    api_key = os.getenv("ENVIROTRUST_API_KEY")
    if not api_key:
        raise RuntimeError("ENVIROTRUST_API_KEY environment variable not set.")
        
    headers = {"x-api-key": api_key}
    url = f"{BASE}{path}"
    
    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(url, headers=headers, params=params, timeout=60)
            r.raise_for_status()  # Raises an exception for 4XX/5XX responses
            
            if stream:
                # This part needs careful handling depending on use case, returning raw response for now
                return r

            return r.json()
        except httpx.HTTPStatusError as e:
            raise RuntimeError(f"EnviroTrust API error {e.response.status_code}: {e.response.text}")
        except httpx.RequestError as e:
            raise RuntimeError(f"Failed to connect to EnviroTrust API: {e}")
        except ValueError:
            raise RuntimeError(f"EnviroTrust API returned non-JSON response: {r.text}")

# 1) Composite risk (AQ, flood, wildfire)
async def get_risk_score(lat: float, lon: float):
    return await _get("/api/climate_risk/risk_score", {"latitude": lat, "longitude": lon})

# 2) Air quality time-series (daily & monthly)
async def get_air_quality_daily(lat: float, lon: float):
    return await _get("/api/airquality/timeseries-daily", {"latitude": lat, "longitude": lon})

async def get_air_quality_monthly(lat: float, lon: float):
    return await _get("/api/airquality/timeseries-monthly", {"latitude": lat, "longitude": lon})

# 3) Flood zone boolean
async def get_flood_zone_current(lat: float, lon: float):
    return await _get("/api/flood/zone-current", {"latitude": lat, "longitude": lon})

# 4) Wildfire current and timeseries
async def get_wildfire_current(lat: float, lon: float):
    return await _get("/api/wildfire/risk-current", {"latitude": lat, "longitude": lon})

async def get_wildfire_timeseries(lat: float, lon: float):
    return await _get("/api/wildfire/timeseries", {"latitude": lat, "longitude": lon})

# 5) Heat/Wind: daily & climate scenarios time series
async def get_heat_wind_daily(lat: float, lon: float):
    return await _get("/api/heat-wind/daily", {"latitude": lat, "longitude": lon})

async def get_heat_wind_timeseries(lat: float, lon: float):
    return await _get("/api/heat-wind/timeseries", {"latitude": lat, "longitude": lon})
