const {knex, connection} = require("./connection") 


const flightsInnerTable = async () =>{
  try {
    const flightsWithDetails = await knex('flights')
      .select(
        'flights.id',
        'flights.airline_company_id',
        'flights.origin_country_id',
        'flights.destination_country_id',
        'flights.departure_time',
        'flights.landing_time',
        'airline_companies.airline_name',
        'origin_country.country_name as origin_country_name',
        'destination_country.country_name as destination_country_name'
      )
      .innerJoin('airline_companies', 'flights.airline_company_id', 'airline_companies.id')
      .innerJoin('countries as origin_country', 'flights.origin_country_id', 'origin_country.id')
      .innerJoin('countries as destination_country', 'flights.destination_country_id', 'destination_country.id')
    const result = flightsWithDetails.map(flight => ({
      id: flight.id,
      airline_company_id: flight.airline_name,
      origin_country_id: flight.origin_country_name,
      destination_country_id: flight.destination_country_name,
      departure_time: flight.departure_time,
      landing_time: flight.landing_time 
    }));

    return (result);
  } catch (error) {
    console.log('Error:', error);
    
  }
}


const getFlightsInnerTableById = async (id) =>{
  try {
    const flightsWithDetails = await knex('flights')
      .select(
        'flights.id',
        'flights.airline_company_id',
        'flights.origin_country_id',
        'flights.destination_country_id',
        'flights.departure_time',
        'flights.landing_time',
        'flights.remaining_tickets',
        'airline_companies.airline_name',
        'origin_country.country_name as origin_country_name',
        'destination_country.country_name as destination_country_name'
      )
      .innerJoin('airline_companies', 'flights.airline_company_id', 'airline_companies.id')
      .innerJoin('countries as origin_country', 'flights.origin_country_id', 'origin_country.id')
      .innerJoin('countries as destination_country', 'flights.destination_country_id', 'destination_country.id')
      .where('flights.id', id); // Filter flights by ID provided in the request body

    const result = flightsWithDetails.map(flight => ({
      id: flight.id,
      airline_company_id: flight.airline_name,
      origin_country_id: flight.origin_country_name,
      destination_country_id: flight.destination_country_name,
      departure_time: flight.departure_time,
      landing_time: flight.landing_time,
      remaining_tickets: flight.remaining_tickets
    }));

    return result;
  } catch (error) {
    console.log('Error:', error);
    throw error; // Rethrow the error to handle it outside
  }
}

module.exports = {
    flightsInnerTable,
getFlightsInnerTableById
}