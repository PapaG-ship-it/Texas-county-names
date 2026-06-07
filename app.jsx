import { useState, useRef, useEffect } from "react";

const COUNTIES = [
  { name: "Anderson", hint: "Palestine's Dogwood Trails" },
  { name: "Andrews", hint: "Permian Basin Oil Patch" },
  { name: "Angelina", hint: "Davy Crockett National Forest" },
  { name: "Aransas", hint: "Whooping Crane Refuge" },
  { name: "Archer", hint: "Wichita Falls Ranch Country" },
  { name: "Armstrong", hint: "Palo Duro Canyon Gateway" },
  { name: "Atascosa", hint: "South Texas Brush Country" },
  { name: "Austin", hint: "First Anglo Colony in Texas" },
  { name: "Bailey", hint: "Muleshoe National Wildlife Refuge" },
  { name: "Bandera", hint: "Cowboy Capital of the World" },
  { name: "Bastrop", hint: "Lost Pines of Texas" },
  { name: "Baylor", hint: "Seymour Aquifer Country" },
  { name: "Bee", hint: "Beeville Aviation Training Hub" },
  { name: "Bell", hint: "Home of Fort Cavazos" },
  { name: "Bexar", hint: "Home of the Alamo" },
  { name: "Blanco", hint: "Lavender Capital of Texas" },
  { name: "Borden", hint: "Almost Uninhabited Texas Plains" },
  { name: "Bosque", hint: "Norwegian Settler Country" },
  { name: "Bowie", hint: "Land of the Knife Legend" },
  { name: "Brazoria", hint: "Cradle of Texas History" },
  { name: "Brazos", hint: "Home of Texas A&M" },
  { name: "Brewster", hint: "Biggest County in Texas" },
  { name: "Briscoe", hint: "Caprock Escarpment Country" },
  { name: "Brooks", hint: "Falfurrias Butter Capital" },
  { name: "Brown", hint: "Brownwood Pecan Country" },
  { name: "Burleson", hint: "Somerville Lake Shores" },
  { name: "Burnet", hint: "Bluebonnet Capital of Texas" },
  { name: "Caldwell", hint: "Lockhart BBQ Capital" },
  { name: "Calhoun", hint: "Matagorda Bay Shores" },
  { name: "Callahan", hint: "Abilene's Eastern Plains" },
  { name: "Cameron", hint: "Southernmost Tip of Texas" },
  { name: "Camp", hint: "Piney Woods Timber Country" },
  { name: "Carson", hint: "Panhandle Wheat Fields" },
  { name: "Cass", hint: "Caddo Lake Cypress Swamps" },
  { name: "Castro", hint: "Dimmitt Pumpkin Capital" },
  { name: "Chambers", hint: "Trinity Bay Wetlands" },
  { name: "Cherokee", hint: "Rusk's Piney Woods" },
  { name: "Childress", hint: "Prairie Dog Town Fork Country" },
  { name: "Clay", hint: "Henrietta Red River Country" },
  { name: "Cochran", hint: "Morton High Plains Cotton" },
  { name: "Coke", hint: "Robert Lee Reservoir Country" },
  { name: "Coleman", hint: "Hord's Creek Lake Country" },
  { name: "Collin", hint: "Plano Tech Corridor" },
  { name: "Collingsworth", hint: "Wellington Red River Plains" },
  { name: "Colorado", hint: "Bluebonnet Trail Country" },
  { name: "Comal", hint: "Fastest Flowing Springs in Texas" },
  { name: "Comanche", hint: "Peach Capital of Texas" },
  { name: "Concho", hint: "Eden Sheep & Goat Country" },
  { name: "Cooke", hint: "Gainesville Butterfield Trail" },
  { name: "Coryell", hint: "Fort Gates Frontier" },
  { name: "Cottle", hint: "Paducah Dryland Farm Country" },
  { name: "Crane", hint: "Permian Basin Pump Jacks" },
  { name: "Crockett", hint: "Davy Crockett's Wild West" },
  { name: "Crosby", hint: "Crosbyton Mesa Country" },
  { name: "Culberson", hint: "Guadalupe Mountains Gateway" },
  { name: "Dallam", hint: "Dalhart's Dust Bowl Memory" },
  { name: "Dallas", hint: "City of Cowboys & Commerce" },
  { name: "Dawson", hint: "Lamesa Cotton Gin Country" },
  { name: "Deaf Smith", hint: "Hereford Deaf Scout Legend" },
  { name: "Delta", hint: "Cooper Freshwater Fishing" },
  { name: "Denton", hint: "University of North Texas Hub" },
  { name: "DeWitt", hint: "Indianola Ghost Port" },
  { name: "Dickens", hint: "Croton Breaks Badlands" },
  { name: "Dimmit", hint: "Carrizo Springs Onion Fields" },
  { name: "Donley", hint: "Clarendon Prairie Town" },
  { name: "Duval", hint: "San Diego South Texas Ranches" },
  { name: "Eastland", hint: "Cisco Horned Frog Country" },
  { name: "Ector", hint: "Odessa Permian Pride" },
  { name: "Edwards", hint: "Rocksprings Mohair Capital" },
  { name: "Ellis", hint: "Waxahachie Gingerbread City" },
  { name: "El Paso", hint: "Where Three States Meet" },
  { name: "Erath", hint: "Stephenville Milk Capital" },
  { name: "Falls", hint: "Where the Brazos Falls" },
  { name: "Fannin", hint: "Bonham Frontier Fort" },
  { name: "Fayette", hint: "Czech-German Heritage Hills" },
  { name: "Fisher", hint: "Roby Rolling Plains Country" },
  { name: "Floyd", hint: "Floydada Pumpkin Capital" },
  { name: "Foard", hint: "Crowell Groesbeck Creek" },
  { name: "Fort Bend", hint: "Sugar Land Sweet Country" },
  { name: "Franklin", hint: "Mount Vernon Piney Woods" },
  { name: "Freestone", hint: "Fairfield Peach Orchards" },
  { name: "Frio", hint: "Pearsall Peanut Capital" },
  { name: "Gaines", hint: "Seminole Oil & Cotton Plains" },
  { name: "Galveston", hint: "Island City of Pirates & Storms" },
  { name: "Garza", hint: "Post J.C. Garza Ranch Legacy" },
  { name: "Gillespie", hint: "Heart of Texas Wine Country" },
  { name: "Glasscock", hint: "Garden City Oil Fields" },
  { name: "Goliad", hint: "Presidio La Bahia Mission" },
  { name: "Gonzales", hint: "Come and Take It Town" },
  { name: "Gray", hint: "Pampa Natural Gas Hub" },
  { name: "Grayson", hint: "Sherman Denison Railroad Town" },
  { name: "Gregg", hint: "Longview East Texas Oil Boom" },
  { name: "Grimes", hint: "Navasota Cajun Country" },
  { name: "Guadalupe", hint: "Seguin Pecan Capital" },
  { name: "Hale", hint: "Plainview Irrigation Prairie" },
  { name: "Hall", hint: "Memphis Red River Cotton" },
  { name: "Hamilton", hint: "Cowhouse Creek Country" },
  { name: "Hansford", hint: "Spearman Panhandle Plains" },
  { name: "Hardeman", hint: "Quanah Comanche Frontier" },
  { name: "Hardin", hint: "Beaumont Piney Woods Oil" },
  { name: "Harris", hint: "Space City USA" },
  { name: "Harrison", hint: "Marshall Pottery Capital" },
  { name: "Hartley", hint: "Channing XIT Ranch Legacy" },
  { name: "Haskell", hint: "Haskell Rolling Plains" },
  { name: "Hays", hint: "San Marcos Mermaid Springs" },
  { name: "Hemphill", hint: "Canadian River Canyon" },
  { name: "Henderson", hint: "Athens Black-Eyed Pea Capital" },
  { name: "Hidalgo", hint: "Citrus Capital of Texas" },
  { name: "Hill", hint: "Hillsboro Cotton & Grain" },
  { name: "Hockley", hint: "Levelland Cotton Flatlands" },
  { name: "Hood", hint: "Granbury Acton Prairie" },
  { name: "Hopkins", hint: "Sulphur Springs Dairy Capital" },
  { name: "Houston", hint: "Crockett Piney Woods Timber" },
  { name: "Howard", hint: "Big Spring Oil Patch" },
  { name: "Hudspeth", hint: "Sierra Blanca Salt Flat Desert" },
  { name: "Hunt", hint: "Greenville Cotton Belt" },
  { name: "Hutchinson", hint: "Borger Carbon Black Plants" },
  { name: "Irion", hint: "Mertzon Sheep & Goat Ranch" },
  { name: "Jack", hint: "Jacksboro Frontier Fort Richardson" },
  { name: "Jackson", hint: "Cotton Belt Heartland" },
  { name: "Jasper", hint: "Jasper Piney Woods Escape" },
  { name: "Jeff Davis", hint: "Land of the Davis Mountains" },
  { name: "Jefferson", hint: "Beaumont Spindletop Gusher" },
  { name: "Jim Hogg", hint: "Hebbronville South Texas Ranches" },
  { name: "Jim Wells", hint: "Alice Hub of South Texas" },
  { name: "Johnson", hint: "Cleburne Chisholm Trail" },
  { name: "Jones", hint: "Stamford Cowboy Reunion" },
  { name: "Karnes", hint: "Cuero Turkey Trot Capital" },
  { name: "Kaufman", hint: "Kaufman Blackland Prairie" },
  { name: "Kendall", hint: "Boerne Cascade Caverns" },
  { name: "Kenedy", hint: "Sarita King Ranch Legacy" },
  { name: "Kent", hint: "Jayton Caprock Breaks" },
  { name: "Kerr", hint: "Kerrville Summer Camp Hub" },
  { name: "Kimble", hint: "Junction Llano River Fishing" },
  { name: "King", hint: "Guthrie 6666 Ranch Country" },
  { name: "Kinney", hint: "The Devil's Backbone Country" },
  { name: "Kleberg", hint: "King Ranch Longhorn Legacy" },
  { name: "Knox", hint: "Benjamin Rolling Plains" },
  { name: "Lamar", hint: "Paris Eiffel Tower Replica" },
  { name: "Lamb", hint: "Littlefield Cotton Fields" },
  { name: "Lampasas", hint: "Lampasas Mineral Springs" },
  { name: "La Salle", hint: "Cotulla Brush Country" },
  { name: "Lavaca", hint: "Where Czech Heritage Lives" },
  { name: "Lee", hint: "Bluebonnet Capital" },
  { name: "Leon", hint: "Centerville Crossroads Town" },
  { name: "Liberty", hint: "Big Thicket Wilderness" },
  { name: "Limestone", hint: "Where Groesbeck Stands" },
  { name: "Lipscomb", hint: "Lipscomb Panhandle Prairie" },
  { name: "Live Oak", hint: "George West Cowboy Country" },
  { name: "Llano", hint: "Deer Hunter's Paradise" },
  { name: "Loving", hint: "Least Populated County in USA" },
  { name: "Lubbock", hint: "Buddy Holly's Hometown" },
  { name: "Lynn", hint: "Tahoka Dryland Farming" },
  { name: "Madison", hint: "Madisonville Sidewalk Cattlemen" },
  { name: "Marion", hint: "Jefferson Antebellum Mansions" },
  { name: "Martin", hint: "Stanton Prairie Dog Colony" },
  { name: "Mason", hint: "Topaz Gem Mining Country" },
  { name: "Matagorda", hint: "Rice Farming Flatlands" },
  { name: "Maverick", hint: "Eagle Pass Rio Grande Crossing" },
  { name: "McCulloch", hint: "Brady Heart of Texas" },
  { name: "McLennan", hint: "Heart of Texas on the Brazos" },
  { name: "McMullen", hint: "Tilden Whitetail Deer Heaven" },
  { name: "Medina", hint: "Apple Capital of Texas" },
  { name: "Menard", hint: "San Saba River Pecan Groves" },
  { name: "Midland", hint: "Permian Basin Business Hub" },
  { name: "Milam", hint: "Land of Ben Milam" },
  { name: "Mills", hint: "Goldthwaite Goat Capital" },
  { name: "Mitchell", hint: "Colorado City Historic Ranch" },
  { name: "Montague", hint: "Nocona Western Boot Capital" },
  { name: "Montgomery", hint: "Woodlands Master-Planned Forest" },
  { name: "Moore", hint: "Dumas Helium Capital" },
  { name: "Morris", hint: "Daingerfield Steel Mill Town" },
  { name: "Motley", hint: "Matador Prairie Breaks" },
  { name: "Nacogdoches", hint: "Oldest Town in Texas" },
  { name: "Navarro", hint: "Corsicana First Oil Well in Texas" },
  { name: "Newton", hint: "Sabine River Piney Woods" },
  { name: "Nolan", hint: "Sweetwater Rattlesnake Roundup" },
  { name: "Nueces", hint: "Sparkling City by the Sea" },
  { name: "Ochiltree", hint: "Perryton Wheatheart of Nation" },
  { name: "Oldham", hint: "Vega Route 66 Panhandle" },
  { name: "Orange", hint: "Sabine-Neches Chemical Coast" },
  { name: "Palo Pinto", hint: "Possum Kingdom Lake" },
  { name: "Panola", hint: "Carthage Country Music Capital" },
  { name: "Parker", hint: "Weatherford Peach & Cutting Horse" },
  { name: "Parmer", hint: "Farwell Feedlot Capital" },
  { name: "Pecos", hint: "First Rodeo in the World" },
  { name: "Polk", hint: "Big Thicket Piney Woods" },
  { name: "Potter", hint: "Amarillo Helium Hub" },
  { name: "Presidio", hint: "The Big Bend Frontier" },
  { name: "Rains", hint: "Emory Bass Fishing Lakes" },
  { name: "Randall", hint: "Canyon Palo Duro Park" },
  { name: "Reagan", hint: "Big Lake Yates Oil Field" },
  { name: "Real", hint: "Leakey Frio River Tubing" },
  { name: "Red River", hint: "Clarksville Oldest Anglo Town" },
  { name: "Reeves", hint: "Pecos Cantaloupe Fields" },
  { name: "Refugio", hint: "Texas Revolution Mission Town" },
  { name: "Roberts", hint: "Miami Panhandle Wind Farm" },
  { name: "Robertson", hint: "Blackland Prairie Country" },
  { name: "Rockwall", hint: "Smallest County in Texas" },
  { name: "Runnels", hint: "Ballinger Cotton & Grain" },
  { name: "Rusk", hint: "Henderson East Texas Oil" },
  { name: "Sabine", hint: "Toledo Bend Reservoir" },
  { name: "San Augustine", hint: "Cradle of Texas Mission" },
  { name: "San Jacinto", hint: "Coldspring Piney Woods" },
  { name: "San Patricio", hint: "Irish Colony of Texas" },
  { name: "San Saba", hint: "Pecan Capital of the World" },
  { name: "Schleicher", hint: "Eldorado Angora Goat Ranch" },
  { name: "Scurry", hint: "Snyder Snowflake Capital" },
  { name: "Shackelford", hint: "Albany Fort Griffin Frontier" },
  { name: "Shelby", hint: "Center Poultry Capital" },
  { name: "Sherman", hint: "Stratford XIT Ranch Panhandle" },
  { name: "Smith", hint: "Tyler Rose Capital of America" },
  { name: "Somervell", hint: "Glen Rose Dinosaur Tracks" },
  { name: "Starr", hint: "Land of the Rio Grande Valley" },
  { name: "Stephens", hint: "Breckenridge Oil Boom Town" },
  { name: "Sterling", hint: "Sterling City Rolling Plains" },
  { name: "Stonewall", hint: "Aspermont Brazos Fork Country" },
  { name: "Sutton", hint: "Sonora Caverns & Wool Capital" },
  { name: "Swisher", hint: "Tulia Panhandle Feedlot Plains" },
  { name: "Tarrant", hint: "Where the West Begins" },
  { name: "Taylor", hint: "Abilene Western Heritage" },
  { name: "Terrell", hint: "Where the Rio Grande Bends" },
  { name: "Terry", hint: "Brownfield Cotton Harvest Plains" },
  { name: "Throckmorton", hint: "Throckmorton Cattle Ranch" },
  { name: "Titus", hint: "Mount Pleasant Poultry Town" },
  { name: "Tom Green", hint: "San Angelo Concho River Pearls" },
  { name: "Travis", hint: "Live Music Capital" },
  { name: "Trinity", hint: "Groveton National Forest" },
  { name: "Tyler", hint: "Woodville Dogwood Festival" },
  { name: "Upshur", hint: "Gilmer East Texas Yamboree" },
  { name: "Upton", hint: "Rankin Permian Oil Pump Jacks" },
  { name: "Uvalde", hint: "Honey Capital of the World" },
  { name: "Val Verde", hint: "Gateway to Mexico" },
  { name: "Van Zandt", hint: "Canton First Monday Trade Days" },
  { name: "Victoria", hint: "Crossroads of South Texas" },
  { name: "Walker", hint: "Huntsville Sam Houston's Home" },
  { name: "Waller", hint: "Prairie View Country" },
  { name: "Ward", hint: "Monahans Sandhills Desert Dunes" },
  { name: "Washington", hint: "Birthplace of Texas Independence" },
  { name: "Webb", hint: "International Trade Gateway" },
  { name: "Wharton", hint: "Sugar Cane Country" },
  { name: "Wheeler", hint: "Shamrock Route 66 Crossroads" },
  { name: "Wichita", hint: "Wichita Falls Midwestern Oil" },
  { name: "Wilbarger", hint: "Vernon Red River Plains" },
  { name: "Willacy", hint: "Raymondville Rio Grande Delta" },
  { name: "Williamson", hint: "Round Rock Tech Boom" },
  { name: "Wilson", hint: "Floresville Peanut Festival" },
  { name: "Winkler", hint: "Kermit Oil Field Country" },
  { name: "Wise", hint: "Decatur Wise County Fair" },
  { name: "Wood", hint: "Mineola Piney Woods Gateway" },
  { name: "Yoakum", hint: "Plains Cowboy Country" },
  { name: "Young", hint: "Graham Possum Kingdom Dam" },
  { name: "Zapata", hint: "Falcon Lake Bass Fishing" },
  { name: "Zavala", hint: "Crystal City Spinach Capital" },
];

const WHEEL_COLORS = [
  "#C0392B", "#E67E22", "#F1C40F", "#27AE60", "#2980B9", "#8E44AD",
  "#16A085", "#D35400", "#1ABC9C", "#2C3E50"
];

function SpinningWheel({ segments, spinning, rotation }) {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = 120;
  const n = segments.length;

  const slices = segments.map((seg, i) => {
    const startAngle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = 1 / n > 0.5 ? 1 : 0;
    const midAngle = (startAngle + endAngle) / 2;
    const tx = cx + (r * 0.65) * Math.cos(midAngle);
    const ty = cy + (r * 0.65) * Math.sin(midAngle);
    const textAngle = (midAngle * 180) / Math.PI + 90;

    return { seg, i, x1, y1, x2, y2, largeArc, tx, ty, textAngle, midAngle };
  });

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Pointer */}
      <div style={{
        position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, fontSize: 28, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
      }}>▼</div>

      <svg
        width={size} height={size}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? "transform 3.5s cubic-bezier(0.17,0.67,0.12,0.99)" : "none",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
          borderRadius: "50%"
        }}
      >
        {slices.map(({ seg, i, x1, y1, x2, y2, largeArc, tx, ty, textAngle }) => (
          <g key={i}>
            <path
              d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`}
              fill={WHEEL_COLORS[i % WHEEL_COLORS.length]}
              stroke="#1a0a00"
              strokeWidth="1.5"
            />
            <text
              x={tx} y={ty}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${textAngle}, ${tx}, ${ty})`}
              fontSize="9"
              fontWeight="700"
              fill="white"
              fontFamily="'Georgia', serif"
              style={{ pointerEvents: "none", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
            >
              {seg.hint.length > 16 ? seg.hint.slice(0, 14) + "…" : seg.hint}
            </text>
          </g>
        ))}
        <circle cx={cx} cy={cy} r={14} fill="#1a0a00" stroke="#D4AF37" strokeWidth="3" />
        <circle cx={cx} cy={cy} r={6} fill="#D4AF37" />
      </svg>
    </div>
  );
}

export default function App() {
  const [wheelSegments, setWheelSegments] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [choices, setChoices] = useState([]);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("spin"); // spin | choose | result
  const rotationRef = useRef(0);

  useEffect(() => {
    pickNewSegments();
  }, []);

  function pickNewSegments() {
    const shuffled = [...COUNTIES].sort(() => Math.random() - 0.5).slice(0, 6);
    setWheelSegments(shuffled);
    setChosen(null);
    setChoices([]);
    setOutput(null);
    setPhase("spin");
  }

  function spinWheel() {
    if (spinning) return;
    setSpinning(true);
    setChosen(null);
    setOutput(null);
    setPhase("spin");

    const extraSpins = (5 + Math.floor(Math.random() * 5)) * 360;
    const sliceAngle = 360 / wheelSegments.length;
    const targetSlice = Math.floor(Math.random() * wheelSegments.length);
    const targetAngle = extraSpins + (360 - targetSlice * sliceAngle) - sliceAngle / 2;

    rotationRef.current = targetAngle;
    setRotation(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      // Figure out which slice is at top (pointer)
      const normalized = ((targetAngle % 360) + 360) % 360;
      const idx = Math.floor(((360 - normalized + sliceAngle / 2) % 360) / sliceAngle) % wheelSegments.length;
      const landed = wheelSegments[idx];

      // Pick 2 more random counties as decoys
      const others = COUNTIES.filter(c => c.name !== landed.name)
        .sort(() => Math.random() - 0.5).slice(0, 2);
      const allChoices = [landed, ...others].sort(() => Math.random() - 0.5);
      setChoices(allChoices);
      setPhase("choose");
    }, 3700);
  }

  async function handleChoice(county) {
    setChosen(county);
    setLoading(true);
    setPhase("result");

    const prompt = `You are a Texas history content creator. Generate a complete 30-second YouTube Shorts video content pack for a video about how ${county.name} County in Texas got its name.

Return ONLY a JSON object (no markdown, no backticks) with these exact keys:
{
  "voiceover": "A punchy 60-80 word voiceover script starting with a hook",
  "imagePrompts": ["prompt1", "prompt2", "prompt3"],
  "musicStyle": "short music style description for CapCut",
  "caption": "A short catchy caption for social media with 3 relevant hashtags",
  "funFact": "One surprising fun fact about the county name origin"
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers:headers: {
  "Content-Type": "application/json",
  "x-api-key": "YOUR-KEY-HERE",
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true"
},
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content.map(b => b.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setOutput(parsed);
    } catch (e) {
      setOutput({ error: "Something went wrong. Try again!" });
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0d0500 0%, #1a0800 40%, #0a0300 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#F5E6C8",
      padding: "20px 16px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative stars */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: "fixed",
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: i % 3 === 0 ? 3 : 2,
          height: i % 3 === 0 ? 3 : 2,
          borderRadius: "50%",
          background: "#D4AF37",
          opacity: 0.3 + Math.random() * 0.4,
          pointerEvents: "none"
        }} />
      ))}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#D4AF37", textTransform: "uppercase", marginBottom: 6 }}>
          ✦ Texas History Series ✦
        </div>
        <h1 style={{
          fontSize: 26, fontWeight: 900, margin: 0,
          background: "linear-gradient(135deg, #D4AF37, #F5E6C8, #D4AF37)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1.2
        }}>
          County Name<br />Spin & Create
        </h1>
        <p style={{ fontSize: 12, color: "#A0896B", margin: "8px 0 0", letterSpacing: 1 }}>
          Spin the wheel → Pick your county → Get your video pack
        </p>
      </div>

      {/* Wheel */}
      {phase !== "result" && wheelSegments.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <SpinningWheel segments={wheelSegments} spinning={spinning} rotation={rotation} />

          {phase === "spin" && (
            <button onClick={spinWheel} disabled={spinning} style={{
              background: spinning ? "#555" : "linear-gradient(135deg, #C0392B, #E74C3C)",
              color: "white", border: "none", borderRadius: 40,
              padding: "14px 40px", fontSize: 16, fontWeight: 800,
              fontFamily: "Georgia, serif", cursor: spinning ? "default" : "pointer",
              boxShadow: spinning ? "none" : "0 4px 20px rgba(192,57,43,0.5)",
              letterSpacing: 1, transition: "all 0.2s",
              textTransform: "uppercase"
            }}>
              {spinning ? "Spinning…" : "🤠 Spin It!"}
            </button>
          )}

          {/* Choice Cards */}
          {phase === "choose" && (
            <div style={{ width: "100%", maxWidth: 360 }}>
              <p style={{ textAlign: "center", fontSize: 13, color: "#D4AF37", letterSpacing: 2, marginBottom: 14, textTransform: "uppercase" }}>
                Pick Your County
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {choices.map((c, i) => (
                  <button key={i} onClick={() => handleChoice(c)} style={{
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    borderRadius: 12, padding: "14px 18px",
                    color: "#F5E6C8", cursor: "pointer", textAlign: "left",
                    transition: "all 0.2s", fontFamily: "Georgia, serif"
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.18)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(212,175,55,0.08)"}
                  >
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#D4AF37" }}>{c.hint}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 32, marginBottom: 12, animation: "spin 1s linear infinite" }}>⚙️</div>
          <p style={{ color: "#D4AF37", letterSpacing: 2, fontSize: 13 }}>GENERATING YOUR VIDEO PACK…</p>
          <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </div>
      )}

      {/* Result */}
      {output && !loading && (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#D4AF37", letterSpacing: 3, textTransform: "uppercase" }}>Video Pack Ready</div>
            <h2 style={{ fontSize: 20, margin: "4px 0", color: "#F5E6C8" }}>{chosen?.name} County</h2>
            <div style={{ fontSize: 12, color: "#A0896B" }}>{chosen?.hint}</div>
          </div>

          {output.error ? (
            <p style={{ color: "#E74C3C", textAlign: "center" }}>{output.error}</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Fun Fact */}
              <Card icon="💡" title="Fun Fact" color="#F39C12">
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>{output.funFact}</p>
              </Card>

              {/* Voiceover */}
              <Card icon="🎙️" title="Voiceover Script" color="#27AE60" copyText={output.voiceover}>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, fontStyle: "italic" }}>"{output.voiceover}"</p>
              </Card>

              {/* Image Prompts */}
              <Card icon="🎨" title="AI Image Prompts (Runway / Pika)" color="#2980B9">
                {output.imagePrompts?.map((p, i) => (
                  <div key={i} style={{
                    background: "rgba(41,128,185,0.1)", borderRadius: 8,
                    padding: "8px 10px", marginBottom: 6, fontSize: 12, lineHeight: 1.5
                  }}>
                    <span style={{ color: "#2980B9", fontWeight: 700 }}>{i + 1}.</span> {p}
                  </div>
                ))}
              </Card>

              {/* Music */}
              <Card icon="🎵" title="CapCut Music Style" color="#8E44AD" copyText={output.musicStyle}>
                <p style={{ margin: 0, fontSize: 13 }}>{output.musicStyle}</p>
              </Card>

              {/* Caption */}
              <Card icon="📱" title="Social Media Caption" color="#C0392B" copyText={output.caption}>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>{output.caption}</p>
              </Card>
            </div>
          )}

          {/* Spin Again */}
          <button onClick={pickNewSegments} style={{
            width: "100%", marginTop: 20,
            background: "linear-gradient(135deg, #D4AF37, #B8860B)",
            color: "#0d0500", border: "none", borderRadius: 40,
            padding: "14px", fontSize: 15, fontWeight: 800,
            fontFamily: "Georgia, serif", cursor: "pointer",
            letterSpacing: 1, textTransform: "uppercase"
          }}>
            🔄 Spin Again
          </button>
        </div>
      )}
    </div>
  );
}

function Card({ icon, title, color, children, copyText }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (!copyText) return;
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${color}44`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 12, padding: "14px 14px 12px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: 1.5, textTransform: "uppercase" }}>
          {icon} {title}
        </div>
        {copyText && (
          <button onClick={copy} style={{
            background: copied ? color : "transparent",
            border: `1px solid ${color}`,
            borderRadius: 6, padding: "3px 10px",
            color: copied ? "#fff" : color,
            fontSize: 11, cursor: "pointer", fontFamily: "Georgia, serif",
            transition: "all 0.2s"
          }}>
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
