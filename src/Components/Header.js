import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';


const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  console.log(currency);
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-expand  " style={{background: "#14161a"}}>
        <div className="container-fluid" style={{background: "#14161a"}}>
          <span className="navbar-brand" style={{background: "#14161a",color: "gold", fontWeight: "bolder"}} onClick={handleHomeClick} >Crypto Hunter</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="md-col">
            <select className="form-select bg-dark" style={{color: "white"}} aria-label="Default select example" value={currency}
              onChange={(e) => setCurrency(e.target.value)}>
              
              
              <option value={'INR'}>INR</option>
              <option value={'USD'}>USD</option>
              
              
            </select>

          </div>
        </div>
      </nav>
{/* 
      <ThemeProvider >
        <CssBaseline />
        <AppBar color="transparent" position="static">

          <Toolbar>
            <h1 onClick={handleHomeClick} variant="h6" component="div" >
              Crypto Hunter
            </h1>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              label="Language"
              variant="outlined"
              sx={{
                marginRight: '16px',
                color: 'white',
                '&:before': {
                  borderColor: 'white',
                },
                '&:after': {
                  borderColor: 'white',
                },
              }}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
          </Toolbar>

        </AppBar>
      </ThemeProvider> */}
    </>
  );
};

export default Header;
