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
      color = '#1F3B60';
      break; 
    case((DNI > 150) && (DNI < 200)):
      color = '#22416B';
      break; 
    case((DNI > 200) && (DNI < 250)):
      color = '#294F82';
      break; 
    case((DNI > 250) && (DNI < 300)):
      color = '#2C568C';
      break;  
    case((DNI > 300) && (DNI < 350)):
      color = '#406477';
      break;       
    case((DNI > 350) && (DNI < 400)):
      color = '#212054';
      break;
    case((DNI > 400) && (DNI < 450)):
      color = '#2A296B';
      break;
    case((DNI > 450) && (DNI < 500)):
      color = '#373589';
      break;
    case((DNI > 550) && (DNI < 600)):
      color = '#413FA3';
      break;
    case ((DNI > 600) && (DNI < 650)):
      color = '#4C4ABF';
      break;
    case ((DNI > 650) && (DNI < 700)):
      color = '#5654D8';
      break;
    case ((DNI > 700) && (DNI < 750)):
      color = '#605EF2';
      break;
    case ((DNI > 750) && (DNI < 800)):
      color = '#9789FF';
      break;
    case ((DNI > 850) && (DNI < 900)):
      color = '#A499FF';
      break;
    case ((DNI > 900) && (DNI < 950)):
      color = '#B6ADFF';
      break;
    case ((DNI > 950) && (DNI < 100)):
      color = '#D1CCFF';
      break;
    default:
      color = '#DFDBFF';
  }
  return color
}

