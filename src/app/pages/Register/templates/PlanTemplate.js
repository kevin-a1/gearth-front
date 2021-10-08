import React from 'react';

const PlanTemplate = ({ setIndex, values, setValues }) => {

    const handleSelect = (value) => {
        setValues({
            ...values,
            ['plan']: value,
        });
        setIndex(1);
    }

    return(
        <>
        <div id="generic_price_table">   
            <section>
                <div className="container">
                    <div className="row" style={{ backgroundColor: '#3E4754' }}>

                        <div className="col-md-3">
                            <div id="silver" className={`generic_content clearfix ${(values['plan'] === 'silver') ? 'active' : ''}`} >

                                <div className="generic_head_price clearfix">

                                    <div className="generic_head_content clearfix">
                                        <div className="head_bg" />
                                        <div className="head">
                                            <span id="silver-title">Silver</span>
                                        </div>
                                    </div>
                                    <div className="generic_price_tag clearfix">  
                                        <span className="price">
                                            <span className="sign">$</span>
                                            <span className="currency">99</span>
                                            <span className="cent">.99</span>
                                            <span className="month">/MON</span>
                                        </span>
                                    </div>

                                </div>                            
                                <div className="generic_feature_list">
                                    <ul className="plate-ul">
                                        <li className="plate-li">
                                            <span>2GB</span> Bandwidth
                                        </li>
                                        <li className="plate-li">
                                            <span>150GB</span> Storage
                                        </li>
                                        <li className="plate-li">
                                            <span>12</span> Accounts
                                            </li>
                                        <li className="plate-li">
                                            <span>7</span> Host Domain
                                            </li>
                                        <li className="plate-li">
                                            <span>24/7</span> Support
                                        </li>
                                    </ul>
                                </div>
                                <div className="generic_price_btn clearfix">
                                    <a onClick={() => { handleSelect('silver') }}>Sign up</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div id="gold" className={`generic_content clearfix ${(values['plan'] === 'gold') ? 'active' : ''}`}>
                                <div className="generic_head_price clearfix">
                                    <div className="generic_head_content clearfix">
                                    <div className="head_bg" />
                                    <div className="head">
                                        <span>Gold</span>
                                    </div>
                                    </div>
                                    <div className="generic_price_tag clearfix">  
                                    <span className="price">
                                        <span className="sign">$</span>
                                        <span className="currency">199</span>
                                        <span className="cent">.99</span>
                                        <span className="month">/MON</span>
                                    </span>
                                    </div>
                                </div>            
                                <div className="generic_feature_list">
                                    <ul>
                                        <li className="gold-li">
                                            <span>2GB</span> Bandwidth
                                        </li>
                                        <li className="gold-li">
                                            <span>150GB</span> Storage
                                        </li>
                                        <li className="gold-li">
                                            <span>12</span> Accounts
                                        </li>
                                        <li className="gold-li">
                                            <span>7</span> Host Domain
                                        </li>
                                        <li className="gold-li">
                                            <span>24/7</span> Support
                                        </li>
                                    </ul>
                                </div>
                                <div className="generic_price_btn clearfix">
                                    <a onClick={() => { handleSelect('gold') }}>Sign up</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div id="diamond" className={`generic_content clearfix ${(values['plan'] === 'diamond') ? 'active' : ''}`}>
                                <div className="generic_head_price clearfix">
                                    <div className="generic_head_content clearfix">
                                    <div className="head_bg" />
                                    <div className="head">
                                        <span>Diamond</span>
                                    </div>
                                    </div>
                                    <div className="generic_price_tag clearfix">  
                                    <span className="price">
                                        <span className="sign">$</span>
                                        <span className="currency">299</span>
                                        <span className="cent">.99</span>
                                        <span className="month">/MON</span>
                                    </span>
                                    </div>
                                </div>                            
                                <div className="generic_feature_list">
                                    <ul>
                                        <li className="diamond-li">
                                            <span>2GB</span> Bandwidth
                                        </li>
                                        <li className="diamond-li">
                                            <span>150GB</span> Storage
                                        </li>
                                        <li className="diamond-li">
                                            <span>12</span> Accounts
                                        </li>
                                        <li className="diamond-li">
                                            <span>7</span> Host Domain
                                        </li>
                                        <li className="diamond-li">
                                            <span>24/7</span> Support
                                        </li>
                                    </ul>
                                </div>
                                <div className="generic_price_btn clearfix">
                                    <a onClick={() => { handleSelect('diamond') }} >Sign up</a>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </section>
        </div>
        </>
    )
}

PlanTemplate.propTypes = {

}

export default PlanTemplate
