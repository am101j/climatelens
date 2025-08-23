import os
import httpx

BASE = "https://api.envirotrust.eu"

async def _get(path, params=None, stream=False):
    headers = {"x-api-key": os.getenv("ENVIROTRUST_API_KEY")}
    url = f"{BASE}{path}"
    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            r = await client.get(url, headers=headers, params=params, follow_redirects=True)
            r.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx)

            if stream:
                return r

            # Ensure JSON response
            try:
                return r.json()
            except ValueError:
                raise RuntimeError(f"EnviroTrust API returned non-JSON response: {r.text}")
        except httpx.RequestError as exc:
            raise RuntimeError(f"An error occurred while requesting {exc.request.url!r}: {exc}")
        except httpx.HTTPStatusError as exc:
            raise RuntimeError(f"Error response {exc.response.status_code} while requesting {exc.request.url!r}: {exc.response.text}")


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