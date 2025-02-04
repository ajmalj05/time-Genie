import React, { useState, useEffect } from 'react';
import {
  Clock,
  Globe2,
  Calendar,
  Timer,
  Moon,
  Sun,
  MapPin,
  Settings,
  Clock3,
  ChevronDown,
  Star,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe
} from 'lucide-react';

// Updated country data with specific dates for special days
const countries = {
  "United States": {
    timezone: "America/New_York",
    states: ["New York", "California", "Texas", "Florida"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      "1/16": "Martin Luther King Jr. Day",
      // February
      "2/14": "Valentine's Day",
      "2/20": "Presidents' Day",
      // March
      "3/17": "St. Patrick's Day",
      "3/20": "First Day of Spring",
      // April
      "4/7": "Good Friday",
      "4/9": "Easter Sunday",
      // May
      "5/14": "Mother's Day",
      "5/29": "Memorial Day",
      // June
      "6/18": "Father's Day",
      "6/19": "Juneteenth",
      "6/21": "Summer Solstice",
      // July
      "7/4": "Independence Day",
      // August
      "8/26": "Women's Equality Day",
      // September
      "9/4": "Labor Day",
      "9/11": "Patriot Day",
      // October
      "10/31": "Halloween",
      // November
      "11/11": "Veterans Day",
      "11/23": "Thanksgiving",
      // December
      "12/25": "Christmas Day",
      "12/31": "New Year's Eve"
    }
  },
  "United Kingdom": {
    timezone: "Europe/London",
    states: ["England", "Scotland", "Wales", "Northern Ireland"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // February
      "2/14": "Valentine's Day",
      // March
      "3/17": "St. Patrick's Day",
      "3/19": "Mother's Day",
      // April
      "4/7": "Good Friday",
      "4/9": "Easter Monday",
      // May
      "5/1": "May Day",
      "5/29": "Spring Bank Holiday",
      // June
      "6/18": "Father's Day",
      // July
      "7/12": "Battle of the Boyne (Northern Ireland)",
      // August
      "8/28": "Summer Bank Holiday",
      // September
      "9/23": "First Day of Autumn",
      // October
      "10/31": "Halloween",
      // November
      "11/5": "Guy Fawkes Night",
      "11/11": "Remembrance Day",
      // December
      "12/25": "Christmas Day",
      "12/26": "Boxing Day"
    }
  },
  "India": {
    timezone: "Asia/Kolkata",
    states: ["Kerala", "Maharashtra", "Delhi", "Tamil Nadu"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      "1/26": "Republic Day",
      // February
      "2/14": "Valentine's Day",
      // March
      "3/8": "Holi",
      "3/11": "Maha Shivaratri",
      // April
      "4/14": "Ambedkar Jayanti",
      "4/2": "Ram Navami",
      // May
      "5/1": "Labour Day",
      "5/14": "Mother's Day",
      // June
      "6/21": "International Yoga Day",
      // August
      "8/15": "Independence Day",
      "8/22": "Raksha Bandhan",
      // September
      "9/19": "Ganesh Chaturthi",
      // October
      "10/2": "Gandhi Jayanti",
      "10/24": "Dussehra",
      // November
      "11/12": "Diwali",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Japan": {
    timezone: "Asia/Tokyo",
    states: ["Tokyo", "Osaka", "Kyoto", "Hokkaido"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      "1/9": "Coming of Age Day",
      // February
      "2/11": "National Foundation Day",
      // March
      "3/3": "Doll Festival",
      "3/21": "Spring Equinox",
      // April
      "4/29": "Showa Day",
      // May
      "5/3": "Constitution Memorial Day",
      "5/5": "Children's Day",
      // June
      "6/21": "Summer Solstice",
      // July
      "7/17": "Marine Day",
      // August
      "8/11": "Mountain Day",
      "8/15": "Obon Festival",
      // September
      "9/18": "Respect for the Aged Day",
      "9/23": "Autumn Equinox",
      // October
      "10/9": "Sports Day",
      // November
      "11/3": "Culture Day",
      "11/23": "Labour Thanksgiving Day",
      // December
      "12/23": "Emperor's Birthday",
      "12/31": "New Year's Eve"
    }
  },
  "Australia": {
    timezone: "Australia/Sydney",
    states: ["New South Wales", "Queensland", "Victoria", "South Australia"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      "1/26": "Australia Day",
      // February
      "2/14": "Valentine's Day",
      // March
      "3/8": "Labour Day (Western Australia)",
      // April
      "4/7": "Good Friday",
      "4/25": "ANZAC Day",
      // May
      "5/14": "Mother's Day",
      "5/29": "Labour Day (Australian Capital Territory)",
      // June
      "6/12": "Queen's Birthday",
      // August
      "8/15": "Assumption of Mary",
      // September
      "9/4": "Father's Day",
      // October
      "10/2": "Labour Day (Australian Capital Territory)",
      "10/31": "Halloween",
      // November
      "11/5": "Melbourne Cup Day",
      // December
      "12/25": "Christmas Day",
      "12/26": "Boxing Day"
    }
  },
  "Canada": {
    timezone: "America/Toronto",
    states: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      "2/20": "Family Day (Ontario, Saskatchewan)",
      // March
      "3/17": "St. Patrick's Day",
      // April
      "4/14": "Good Friday",
      "4/17": "Easter Monday",
      // May
      "5/22": "Victoria Day",
      // July
      "7/1": "Canada Day",
      // September
      "9/4": "Labour Day",
      // October
      "10/31": "Halloween",
      // November
      "11/11": "Remembrance Day",
      // December
      "12/25": "Christmas Day",
      "12/26": "Boxing Day"
    }
  },
  "Brazil": {
    timezone: "America/Sao_Paulo",
    states: ["Sao Paulo", "Rio de Janeiro", "Bahia", "Minas Gerais"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      "2/25": "Carnival",
      // April
      "4/21": "Tiradentes Day",
      // May
      "5/1": "Labour Day",
      // September
      "9/7": "Independence Day",
      // October
      "10/12": "Our Lady of Aparecida (Patroness of Brazil)",
      // November
      "11/2": "All Souls' Day",
      "11/15": "Proclamation of the Republic",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Germany": {
    timezone: "Europe/Berlin",
    states: ["Bavaria", "Berlin", "Hamburg", "Hessen"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // April
      "4/7": "Good Friday",
      "4/9": "Easter Sunday",
      // May
      "5/1": "Labour Day",
      // October
      "10/3": "German Unity Day",
      // December
      "12/25": "Christmas Day",
      "12/31": "New Year's Eve"
    }
  },
  "France": {
    timezone: "Europe/Paris",
    states: ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Brittany", "Normandy"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // May
      "5/1": "Labour Day",
      // July
      "7/14": "Bastille Day",
      // August
      "8/15": "Assumption of Mary",
      // November
      "11/1": "All Saints' Day",
      "11/11": "Armistice Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Mexico": {
    timezone: "America/Mexico_City",
    states: ["Chihuahua", "Jalisco", "Yucatan", "Nuevo Leon"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // February
      "2/5": "Constitution Day",
      // March
      "3/21": "Birthday of Benito Juárez",
      // May
      "5/1": "Labour Day",
      "5/10": "Mother's Day",
      // September
      "9/16": "Independence Day",
      // November
      "11/2": "Day of the Dead",
      "11/20": "Revolution Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Italy": {
    timezone: "Europe/Rome",
    states: ["Lazio", "Tuscany", "Sicily", "Piedmont"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // April
      "4/17": "Easter Sunday",
      "4/25": "Liberation Day",
      // May
      "5/1": "Labour Day",
      // June
      "6/2": "Republic Day",
      // August
      "8/15": "Assumption of Mary",
      // November
      "11/1": "All Saints' Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Argentina": {
    timezone: "America/Argentina/Buenos_Aires",
    states: ["Buenos Aires", "Cordoba", "Santa Fe", "Mendoza"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // February
      "2/14": "Valentine's Day",
      // March
      "3/24": "Truth and Justice Memorial Day",
      // April
      "4/2": "Malvinas Day",
      // May
      "5/1": "Labour Day",
      "5/25": "May Revolution Day",
      // June
      "6/20": "Flag Day",
      // July
      "7/9": "Independence Day",
      // August
      "8/15": "Assumption of Mary",
      // September
      "9/21": "Student Day",
      // October
      "10/12": "Day of Respect for Cultural Diversity",
      // November
      "11/2": "All Souls' Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "South Korea": {
    timezone: "Asia/Seoul",
    states: ["Seoul", "Busan", "Incheon", "Daegu"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // February
      "2/14": "Valentine's Day",
      // March
      "3/1": "Independence Movement Day",
      // April
      "4/5": "Children's Day",
      // May
      "5/5": "Children's Day",
      "5/8": "Parents' Day",
      // June
      "6/6": "Memorial Day",
      // July
      "7/17": "Constitution Day",
      // August
      "8/15": "Independence Day",
      // September
      "9/27": "Chuseok (Korean Harvest Festival)",
      // October
      "10/3": "National Foundation Day",
      // November
      "11/11": "Pepero Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Russia": {
    timezone: "Europe/Moscow",
    states: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      "1/7": "Orthodox Christmas Day",
      // February
      "2/23": "Defender of the Fatherland Day",
      // March
      "3/8": "International Women's Day",
      // April
      "4/12": "Cosmonautics Day",
      // May
      "5/1": "Labour Day",
      "5/9": "Victory Day",
      // June
      "6/12": "Russia Day",
      // August
      "8/22": "Russian Flag Day",
      // September
      "9/1": "Knowledge Day",
      // October
      "10/4": "Day of Animal Protection",
      // November
      "11/4": "Unity Day",
      // December
      "12/12": "Constitution Day"
    }
  },
  "Spain": {
    timezone: "Europe/Madrid",
    states: ["Madrid", "Catalonia", "Andalusia", "Valencia"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      "1/6": "Epiphany",
      // March
      "3/19": "St. Joseph's Day (Valencia)",
      // April
      "4/14": "Good Friday",
      "4/17": "Easter Monday",
      // May
      "5/1": "Labour Day",
      "5/15": "San Isidro Day (Madrid)",
      // June
      "6/24": "St. John’s Eve (Catalonia)",
      // August
      "8/15": "Assumption of Mary",
      // October
      "10/12": "National Day of Spain",
      // November
      "11/1": "All Saints' Day",
      // December
      "12/6": "Constitution Day",
      "12/25": "Christmas Day"
    }
  },
 
  "China": {
    timezone: "Asia/Shanghai",
    states: ["Beijing", "Shanghai", "Guangdong", "Sichuan"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // February
      "2/10": "Chinese New Year",
      // March
      "3/8": "International Women's Day",
      // April
      "4/4": "Tomb Sweeping Day",
      // May
      "5/1": "Labour Day",
      "5/4": "Youth Day",
      // June
      "6/1": "Children's Day",
      // September
      "9/30": "Mid-Autumn Festival",
      // October
      "10/1": "National Day",
      // November
      "11/11": "Singles' Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Egypt": {
    timezone: "Africa/Cairo",
    states: ["Cairo", "Alexandria", "Giza", "Aswan"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // April
      "4/25": "Sinai Liberation Day",
      // May
      "5/1": "Labour Day",
      // July
      "7/23": "Revolution Day",
      // September
      "9/11": "Hijri New Year",
      // October
      "10/6": "Armed Forces Day",
      // November
      "11/14": "Mawlid al-Nabi",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Nigeria": {
    timezone: "Africa/Lagos",
    states: ["Lagos", "Abuja", "Ogun", "Rivers"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // April
      "4/7": "Good Friday",
      // May
      "5/1": "Labour Day",
      // June
      "6/12": "Democracy Day",
      // October
      "10/1": "Independence Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  
  "Vietnam": {
    timezone: "Asia/Ho_Chi_Minh",
    states: ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      "1/31": "Tet Nguyen Dan (Lunar New Year)",
      // February
      "2/3": "Founding Day of the Communist Party",
      // March
      "3/8": "International Women's Day",
      // April
      "4/30": "Reunification Day",
      // May
      "5/1": "Labour Day",
      "5/19": "Ho Chi Minh's Birthday",
      // August
      "8/15": "Assumption of Mary",
      // September
      "9/2": "National Day",
      // October
      "10/10": "Hanoi Liberation Day",
      // November
      "11/20": "Teachers' Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Turkey": {
    timezone: "Europe/Istanbul",
    states: ["Istanbul", "Ankara", "Izmir", "Bursa"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // April
      "4/23": "National Sovereignty and Children's Day",
      // May
      "5/1": "Labour Day",
      "5/19": "Atatürk Memorial Day",
      // July
      "7/20": "Ramazan Bayram",
      // August
      "8/30": "Victory Day",
      // October
      "10/29": "Republic Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "South Africa": {
    timezone: "Africa/Johannesburg",
    states: ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // April
      "4/6": "Good Friday",
      // May
      "5/1": "Labour Day",
      // June
      "6/16": "Youth Day",
      // August
      "8/9": "Women's Day",
      // September
      "9/24": "Heritage Day",
      // December
      "12/25": "Christmas Day",
      "12/26": "Day of Goodwill"
    }
  },
  "Afghanistan": {
    timezone: "Asia/Kabul",
    states: ["Kabul", "Herat", "Kandahar", "Mazar-i-Sharif"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // March
      "3/21": "Nowruz (Persian New Year)",
      // April
      "4/27": "Victory Day",
      // May
      "5/1": "Labour Day",
      // June
      "6/21": "Fathers' Day",
      // August
      "8/19": "Independence Day",
      // September
      "9/11": "Martyrs' Day",
      // October
      "10/24": "Eid al-Fitr",
      // November
      "11/2": "All Souls' Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Bangladesh": {
    timezone: "Asia/Dhaka",
    states: ["Dhaka", "Chittagong", "Rajshahi", "Khulna"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // March
      "3/26": "Independence Day",
      // April
      "4/14": "Pohela Boishakh (Bengali New Year)",
      // May
      "5/1": "Labour Day",
      // June
      "6/16": "Fathers' Day",
      // August
      "8/15": "National Mourning Day",
      // October
      "10/5": "Eid al-Adha",
      // December
      "12/16": "Victory Day",
      "12/25": "Christmas Day"
    }
  },
  "Bhutan": {
    timezone: "Asia/Thimphu",
    states: ["Thimphu", "Phuntsholing", "Paro", "Punakha"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // February
      "2/19": "Losar (Bhutanese New Year)",
      // April
      "4/4": "Parinirvana Day",
      // May
      "5/1": "Labour Day",
      // June
      "6/16": "Fathers' Day",
      // August
      "8/15": "Assumption of Mary",
      // September
      "9/23": "Autumn Festival",
      // October
      "10/23": "Coronation Day",
      // November
      "11/11": "Independence Day",
      // December
      "12/17": "National Day"
    }
  },
  "Cambodia": {
    timezone: "Asia/Phnom_Penh",
    states: ["Phnom Penh", "Siem Reap", "Battambang", "Sihanoukville"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // April
      "4/13": "Khmer New Year",
      // May
      "5/1": "Labour Day",
      // June
      "6/18": "Royal Birthday of King Norodom Sihamoni",
      // July
      "7/20": "King's Birthday",
      // September
      "9/24": "Constitution Day",
      // October
      "10/5": "Buddha Day",
      // November
      "11/9": "Independence Day",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Georgia": {
    timezone: "Asia/Tbilisi",
    states: ["Tbilisi", "Batumi", "Kutaisi", "Zugdidi"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // March
      "3/8": "International Women's Day",
      // May
      "5/26": "Independence Day",
      // July
      "7/28": "Mariamoba",
      // September
      "9/27": "Feast of the Holy Cross",
      // October
      "10/14": "Saint George's Day",
      // November
      "11/23": "Day of Saint George",
      // December
      "12/25": "Christmas Day"
    }
  },
  
  "Indonesia": {
    timezone: "Asia/Jakarta",
    states: ["Jakarta", "Surabaya", "Bandung", "Medan"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // February
      "2/10": "Chinese New Year",
      // April
      "4/9": "Good Friday",
      // May
      "5/1": "Labour Day",
      "5/20": "Ascension of Jesus Christ",
      // August
      "8/17": "Independence Day",
      // October
      "10/15": "Muharram",
      // November
      "11/15": "Day of Sacrifice",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Iraq": {
    timezone: "Asia/Baghdad",
    states: ["Baghdad", "Basra", "Erbil", "Mosul"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // March
      "3/21": "Nowruz (Persian New Year)",
      // April
      "4/9": "Fall of Baghdad",
      // May
      "5/1": "Labour Day",
      // June
      "6/10": "Martyrs' Day",
      // July
      "7/14": "Revolution Day",
      // August
      "8/14": "Independence Day",
      // October
      "10/3": "Eid al-Adha",
      // November
      "11/30": "Ashura",
      // December
      "12/25": "Christmas Day"
    }
  },
  "Jordan": {
    timezone: "Asia/Amman",
    states: ["Amman", "Irbid", "Aqaba", "Mafraq"],
    specialDays: {
      // January
      "1/1": "New Year's Day",
      // March
      "3/19": "Mother's Day",
      // May
      "5/1": "Labour Day",
      // July
      "7/20": "Revolution Day",
      // September
      "9/25": "Armed Forces Day",
      // November
      "11/1": "All Saints' Day",
      // December
      "12/25": "Christmas Day"
    }
  }
  // ... (Continue with more countries like Argentina, Russia, South Korea, Spain, etc.)
};

function App() {
  const [time, setTime] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [is24Hour, setIs24Hour] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedCountry && countries[selectedCountry]) {
      setTimezone(countries[selectedCountry].timezone);
    }
  }, [selectedCountry]);

  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: showSeconds ? 'numeric' : undefined,
      hour12: !is24Hour,
      timeZone: timezone
    };
    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timezone
    };
    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  const getCurrentSpecialDay = () => {
    if (!selectedCountry) return null;
    
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateKey = `${month}/${day}`;
    
    return countries[selectedCountry].specialDays[dateKey];
  };

  const getWeek = () => {
    const currentDate = new Date(time);
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() + 3 - (currentDate.getDay() + 6) % 7);
    const week1 = new Date(currentDate.getFullYear(), 0, 4);
    return 1 + Math.round(((currentDate.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  const isDaytime = () => {
    const hours = time.getHours();
    return hours >= 6 && hours < 18;
  };

  const specialDay = getCurrentSpecialDay();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="p-4 border-b border-gray-700">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6" />
            <span className="text-xl font-bold">Time Genie</span>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Location Selection Box */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Globe2 className="w-5 h-5 mr-2 text-blue-400" />
              Select Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Country</label>
                <select
                  className="w-full bg-gray-700 rounded-lg p-2 text-white border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400/20 transition-colors"
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setSelectedState("");
                  }}
                >
                  <option value="">Select a country</option>
                  {Object.keys(countries).map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              {selectedCountry && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">State/Region</label>
                  <select
                    className="w-full bg-gray-700 rounded-lg p-2 text-white border border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-400/20 transition-colors"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option value="">Select a state/region</option>
                    {countries[selectedCountry].states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-lg">
                  {selectedCountry ? `${selectedCountry}${selectedState ? ` - ${selectedState}` : ''}` : timezone}
                </span>
              </div>
              {isDaytime() ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-blue-200" />
              )}
            </div>

            <div className="text-center mb-8">
              <div className="text-7xl font-bold tracking-wider mb-4">
                {formatTime()}
              </div>
              <div className="text-xl text-gray-400">
                {formatDate()}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Week {getWeek()} of {time.getFullYear()}
              </div>
            </div>

            {specialDay && (
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  Today's Special Event
                </h3>
                <p className="text-gray-300">{specialDay}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Unix Timestamp</div>
                <div className="text-xl">{Math.floor(time.getTime() / 1000)}</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">ISO Date</div>
                <div className="text-xl">{time.toISOString()}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock3 className="w-5 h-5 mr-2 text-blue-400" />
                Popular Time Zones
              </h2>
              <div className="space-y-3">
                {Object.entries(countries).slice(0, 4).map(([country, data]) => (
                  <div key={country} className="flex justify-between items-center">
                    <span>{country}</span>
                    <span>
                      {new Intl.DateTimeFormat('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZone: data.timezone,
                        hour12: !is24Hour
                      }).format(time)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                Calendar
              </h2>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {time.toLocaleDateString('en-US', { month: 'long' })}
                </div>
                <div className="text-gray-400">
                  {time.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          {/* Time Format Controls */}
          <div className="flex justify-center space-x-4 mb-8 border-b border-gray-700 pb-6">
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              className="text-sm hover:text-blue-400"
            >
              {is24Hour ? '24h' : '12h'} format
            </button>
            <button
              onClick={() => setShowSeconds(!showSeconds)}
              className="text-sm hover:text-blue-400"
            >
              {showSeconds ? 'Hide' : 'Show'} seconds
            </button>
          </div>

          {/* Developer Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white mb-3">About</h3>
              <p className="text-gray-400">
                TimeSync is a modern time synchronization tool built with precision and elegance.
                Accurate time synchronized with atomic clock time servers.
              </p>
            </div>

            {/* Contact */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:your.email@example.com" className="hover:text-blue-400 transition-colors">
                  ajmalj2003@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-400 mt-2">
                <Globe className="w-4 h-4" />
                <a href="https://your-website.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  coming soon
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://github.com/ajmalj05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} TimeGenie. Built with ❤️ by Ajmal J
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;