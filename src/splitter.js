import React, { useState } from 'react';
import Logo from './images/logo.svg';

const Splitter = ()=> {

    const [billAmount, setBillAmount] = useState('');
    const [totalPeople, setTotalPeople] = useState('');
    const [customTip, setCustomTip] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [showBillError, setBillError] = useState(false);
    const [billeErrorMsg, setBillErrorMsg] = useState('');

    const [tipAmount, setTipAmount] = useState(0+".00");
    const [totalBill, setTotalBill] = useState(0+".00");
    const [isFocused, setIsFocused] = useState(false);
  
    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBillChange = (event) => {
      const input = event.target.value;
      // Validate the input value
      if (/^\d*\.?\d*$/.test(input) || input === '') {
        setBillAmount(input);
      }
    };
  
    const handleKeyPress = (event) => {
      // Allow only digits (0-9), decimal point (.), and backspace
      if (!/\d|\./.test(event.key) && event.key !== 'Backspace') {
        event.preventDefault(); // Prevent invalid character insertion, including minus sign
      }
    };
  
    const handleKeyPressPeople = (event) => {
      // Allow only numbers and backspace, preventing negative sign and decimals
      if (/[^0-9\b]/.test(event.key)) {
        event.preventDefault();
      }
    };
  
    const handleTotalPeopleChange = (event) => {
      let totalPeople = event.target.value
      setTotalPeople(totalPeople);
      if(totalPeople === ""){
        setErrorMsg('Can\'t be empty');
        setShowError(true);
      }else if (Number(totalPeople) === 0){
        setErrorMsg('Can\'t be zero');
        setShowError(true);
      }else{
        setErrorMsg('');
        setShowError(false);
      }
    };
  
    const setCustomTipValue = (event) => {
      const newCustomTip = event.target.value
      if(newCustomTip === "" || Number(newCustomTip) === 0){
        setTipAmount(0+".00");
        setTotalBill(0+".00");
      }
      setCustomTip(newCustomTip);
    };
  
    const handleReset = () => {
      setBillAmount('');
      setTotalPeople('');
      setCustomTip('');
      setErrorMsg('');
      setTipAmount(0+".00");
      setTotalBill(0+".00");
    };

    const calculateCustomTipAndTotalBill = (event)=> {
      if(event.target.value === "" || Number(event.target.value) === 0){
        return false;
      }
      manipulateCustomTipAndTotalBill(customTip);
    }
  
    const calculateTip = (tipPercentage) => {
      if(totalPeople === ""){
        setErrorMsg('Can\'t be empty');
        setShowError(true);
        if(billAmount === ""){
          setBillErrorMsg("PLease Enter Bill Amount");
          setBillError(true);
        }else if(Number(billAmount) === 0){
          setBillErrorMsg("Please Enter valid Amount");
          setBillError(true);
        }else{
          setBillErrorMsg("");
          setBillError(false);
        }
      }else if(Number(totalPeople) === 0){
        setErrorMsg('Can\'t be zero');
        setShowError(true);
        if(billAmount === ""){
          setBillErrorMsg("PLease Enter Bill Amount");
          setBillError(true);
        }else if(Number(billAmount) === 0){
          setBillErrorMsg("Please Enter valid Amount");
          setBillError(true);
        }
      }else{
        setErrorMsg('');
        setShowError(false);
        if(billAmount === ""){
          setBillErrorMsg("PLease Enter Bill Amount");
          setBillError(true);
        }else if(billAmount === "0"){
          setBillErrorMsg("Please Enter valid Amount");
          setBillError(true);
        }else{
          setBillErrorMsg("");
          setBillError(false);
          if (!isNaN(tipPercentage) && totalPeople > 0) {
            const tipAmountPerPerson = (billAmount * tipPercentage / 100) / totalPeople;
            setTipAmount(tipAmountPerPerson.toFixed(2));
            setTotalBill(((billAmount / totalPeople) + tipAmountPerPerson).toFixed(2));
          }
        }
      }
    };

    const manipulateCustomTipAndTotalBill = (customTipPercentage) => {
      if(totalPeople === ""){
        setErrorMsg('Can\'t be empty');
        setShowError(true);
        if(billAmount === ""){
          setBillErrorMsg("PLease Enter Bill Amount");
          setBillError(true);
        }else if(Number(billAmount) === 0){
          setBillErrorMsg("Please Enter valid Amount");
          setBillError(true);
        }else{
          setBillErrorMsg('');
          setBillError(false);
        }
      }else if(Number(totalPeople) === 0){
        setErrorMsg('Can\'t be zero');
        setShowError(true);
        if(billAmount === ""){
          setBillErrorMsg("PLease Enter Bill Amount");
          setBillError(true);
        }else if(Number(billAmount) === 0){
          setBillErrorMsg("Please Enter valid Amount");
          setBillError(true);
        }
      }else{
        setErrorMsg('');
        setShowError(false);
        if(billAmount === ""){
          setBillErrorMsg("PLease Enter Bill Amount");
          setBillError(true);
        }else if(billAmount === "0"){
          setBillErrorMsg("Please Enter valid Amount");
          setBillError(true);
        }else{
            setErrorMsg('');
            setShowError(false);
            setBillErrorMsg('');
            setBillError(false);
            const customTipAmountPerPerson = (billAmount * customTipPercentage / 100) / totalPeople;
            setTipAmount(customTipAmountPerPerson.toFixed(2));
            setTotalBill(((billAmount / totalPeople) + customTipAmountPerPerson).toFixed(2));
        }
      }
    };

    return(
      <>
        <main className="tip-calculator">
      <div className="logo"><img src={Logo} alt="" /></div>
      <div className="sections">
        <section className="section-one">
          {/* <label className="labels" htmlFor="bill">Bill</label> */}
          <div className="bill-label_error-msg">
            <label className="labels" htmlFor="bill">Bill</label>
            {showBillError && <span className="error-msg">{billeErrorMsg}</span>}
          </div>
          <input className="bill-input" type="number" min="0" placeholder="0" value={billAmount} onChange={handleBillChange} onKeyPress={handleKeyPress} onFocus={handleFocus} style={{ color: isFocused ? 'hsl(183, 100%, 15%)' : 'black',fontWeight: isFocused ? 700 : 'normal',border: showBillError && billeErrorMsg !== '' ? '1.5px solid #DC7E64' : '' }}/>
          <label className="labels" htmlFor="select-tip" style={{ marginTop: '2.5em' }}>Select Tip %</label>
          <div className="tips-values">
            <div className="tip-value1">
              <div onClick={() => calculateTip(5)}>5%</div>
              <div onClick={() => calculateTip(10)}>10%</div>
              <div onClick={() => calculateTip(15)}>15%</div>
            </div>
            <div className="tip-value2">
              <div onClick={() => calculateTip(25)} style={{ padding: '.3em 1.5em' }}>25%</div>
              <div onClick={() => calculateTip(50)} style={{ padding: '.3em 1.8em' }}>50%</div>
              <input className="custom-input" type="number" placeholder="Custom" title='Custom input is in %' value={customTip} onChange={setCustomTipValue} onClick={calculateCustomTipAndTotalBill} onFocus={handleFocus} style={{ color: isFocused ? 'hsl(183, 100%, 15%)' : 'black',fontWeight: isFocused ? 700 : 'normal' }}/>
            </div>
          </div>

        {/* mobile tip section */}
        <div className="tips-values_mobile" style={{display: 'none'}}>
          <div className="tip-value1_mobile">
            <div onClick={() => calculateTip(5)}>5%</div>
            <div onClick={() => calculateTip(10)}>10%</div>
          </div>
          <div className="tip-value2_mobile">
            <div style={{padding: '.3em 3.5em'}} onClick={() => calculateTip(15)}>15%</div>
            <div onClick={() => calculateTip(25)}>25%</div> 
          </div>
          <div className="tip-value3_mobile">
            <div onClick={() => calculateTip(50)}>50%</div>
            <input className="custom-input_mobile" type="number" placeholder="Custom" title="Custom input is in %" value={customTip} onChange={setCustomTipValue} onClick={calculateCustomTipAndTotalBill} onFocus={handleFocus} style={{ color: isFocused ? 'hsl(183, 100%, 15%)' : 'black',fontWeight: isFocused ? 700 : 'normal' }}/>
          </div>
        </div>
          <div className="pep-label_error-msg">
            <label className="labels" htmlFor="number-of-people">Number of People</label>
            {showError && <span className="error-msg">{errorMsg}</span>}
          </div>
          <input className="tpeople" type="number" placeholder="0" value={totalPeople} onChange={handleTotalPeopleChange} onKeyPress={handleKeyPressPeople} onFocus={handleFocus} style={{ color: isFocused ? 'hsl(183, 100%, 15%)' : 'black',fontWeight: isFocused ? 700 : 'normal',border: showError && errorMsg !== '' ? '1.5px solid #DC7E64' : ''}}/>
        </section>
        <section className="section-two">
          <div className="amounts">
            <div className="section-two_sub1">
              <p>Tip Amount<span>/ person</span></p>
              <p className="tip-amount">${tipAmount}</p>
            </div>
            <div className="section-two_sub2">
              <p>Total<span>/ person</span></p>
              <p className="total-amount">${totalBill}</p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}><button className="reset-btn" onClick={handleReset}>Reset</button></div>
        </section>
      </div>
    </main>
    <div className="attribution">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>.
    Coded by <a href="https://www.frontendmentor.io/profile/atif-dev" target="_blank" rel="noreferrer">Atif Iqbal</a>.
  </div>
  </>
    );
}

export default Splitter;