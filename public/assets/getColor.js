const getColor = (DNI) => {
  let color;
  switch(true) {
    case (DNI < 50):
      color = 'black';
      break;
    case((DNI > 50) && (DNI < 100)):
      color = '#0C0C42';
      break; 
    case((DNI > 100) && (DNI < 150)):
      color = '#1F2041';
      break; 
    case((DNI > 150) && (DNI < 200)):
      color = '#292B56';
      break; 
    case((DNI > 200) && (DNI < 250)):
      color = '#292B56';
      break; 
    case((DNI > 250) && (DNI < 300)):
      color = '#4E4177';
      break;  
    case((DNI > 300) && (DNI < 350)):
      color = '#3D5A6C';
      break;       
    case((DNI > 350) && (DNI < 400)):
      color = '#72A98F';
      break;
    case((DNI > 400) && (DNI < 450)):
      color = '#1C3738';
      break;
    case((DNI > 450) && (DNI < 500)):
      color = '#8DE969';
      break;
    case((DNI > 550) && (DNI < 600)):
      color = '#8DE969';
      break;
    case ((DNI > 600) && (DNI < 650)):
      color = '#DEB841';
      break;
    case ((DNI > 650) && (DNI < 700)):
      color = '#DE9E36';
      break;
    case ((DNI > 700) && (DNI < 750)):
      color = '#FFDE3A';
      break;
    case ((DNI > 750) && (DNI < 800)):
      color = '#F1FF8C';
      break;
    case ((DNI > 850) && (DNI < 900)):
      color = '#DC9046';
      break;
    case ((DNI > 900) && (DNI < 950)):
      color = '#FF7129';
      break;
    case ((DNI > 950) && (DNI < 1000)):
      color = '#FE4D2F';
      break;
    default:
      color = '#F22B2B';
  }
  return color
}

