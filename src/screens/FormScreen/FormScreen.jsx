import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../components/Header/Header';
import styles from './FormScreen.module.css';
import { supabase } from '../../lib/supabaseClient';

const splitFullName = (fullName) => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { first_name: parts[0], middle_name: null, last_name: '' };
  } else if (parts.length === 2) {
    return { first_name: parts[0], middle_name: null, last_name: parts[1] };
  } else {
    const first_name = parts[0];
    const last_name = parts[parts.length - 1];
    const middle_name = parts.slice(1, -1).join(' ');
    return { first_name, middle_name, last_name };
  }
};

const MOCK_WARDS = [
  { id: '11111111-1111-1111-1111-111111111111', ward_name: 'Ward 14 - Infrastructure', ward_number: '14' },
  { id: '22222222-2222-2222-2222-222222222222', ward_name: 'Ward 12 - Civic Center', ward_number: '12' },
  { id: '33333333-3333-3333-3333-333333333333', ward_name: 'Ward 08 - Green Park', ward_number: '08' }
];

const MOCK_CONSTITUENCIES = [
  { id: '44444444-4444-4444-4444-444444444444', constituency_name: 'New Delhi', state: 'Delhi' },
  { id: '55555555-5555-5555-5555-555555555555', constituency_name: 'Mumbai South', state: 'Maharashtra' },
  { id: '66666666-6666-6666-6666-666666666666', constituency_name: 'Bangalore South', state: 'Karnataka' }
];

const FormScreen = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const { language } = useLanguage();

  // Determine Form Type (Citizen vs MP)
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get('type') === 'mp' ? 'MP' : 'Citizen';

  const [user, setUser] = useState(null);
  const [formRole, setFormRole] = useState(initialType); // 'Citizen' | 'MP'
  const [fullName, setFullName] = useState(location.state?.fullName || '');
  const [age, setAge] = useState(location.state?.age || '');
  
  // Database fields
  const [wards, setWards] = useState([]);
  const [constituencies, setConstituencies] = useState([]);

  // Citizen inputs
  const [citizenPhone, setCitizenPhone] = useState('');
  const [citizenWard, setCitizenWard] = useState('');
  const [citizenAddress, setCitizenAddress] = useState('');

  // MP inputs
  const [mpPhone, setMpPhone] = useState('');
  const [mpParty, setMpParty] = useState('');
  const [mpConstituency, setMpConstituency] = useState('');
  const [mpTermStart, setMpTermStart] = useState('2024-06-04');
  const [mpTermEnd, setMpTermEnd] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Fetch user session and profile role
  useEffect(() => {
    const fetchUserAndRole = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser(authUser);
          
          // Fetch profile metadata
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (profile) {
            if (!location.state?.fullName) setFullName(profile.full_name || '');
            if (profile.role === 'Citizen' || profile.role === 'MP') {
              setFormRole(profile.role);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
    fetchUserAndRole();
  }, []);

  // 2. Fetch Wards & Constituencies from database
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetch Wards
        const { data: dbWards } = await supabase
          .from('wards')
          .select('id, ward_name, ward_number')
          .order('ward_number');
        setWards(dbWards && dbWards.length > 0 ? dbWards : MOCK_WARDS);

        // Fetch Constituencies
        const { data: dbConsts } = await supabase
          .from('constituencies')
          .select('id, constituency_name, state')
          .order('constituency_name');
        setConstituencies(dbConsts && dbConsts.length > 0 ? dbConsts : MOCK_CONSTITUENCIES);
      } catch (err) {
        console.error('Error fetching dropdown data:', err);
        setWards(MOCK_WARDS);
        setConstituencies(MOCK_CONSTITUENCIES);
      }
    };
    fetchDropdownData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (!user) {
        // Mock success for testing/preview if not authenticated
        setSuccessMsg(language === 'en' ? 'Form preview submitted successfully!' : 'फ़ॉर्म पूर्वावलोकन सफलतापूर्वक सबमिट किया गया!');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
        return;
      }

      if (formRole === 'Citizen') {
        if (!citizenPhone || !citizenWard || !age) {
          throw new Error(language === 'en' ? 'Please fill in all required fields.' : 'कृपया सभी आवश्यक फ़ील्ड भरें।');
        }
        
        const nameParts = splitFullName(fullName);

        const { error } = await supabase.from('citizens').update({
          first_name: nameParts.first_name,
          middle_name: nameParts.middle_name,
          last_name: nameParts.last_name,
          age: parseInt(age, 10),
          phone_number: citizenPhone,
          ward_id: citizenWard,
          address: citizenAddress || null
        }).eq('id', user.id);

        if (error) throw error;
      } else {
        if (!mpPhone || !mpParty || !mpConstituency || !mpTermStart || !age) {
          throw new Error(language === 'en' ? 'Please fill in all required fields.' : 'कृपया सभी आवश्यक फ़ील्ड भरें।');
        }

        const nameParts = splitFullName(fullName);
        const ageNum = parseInt(age, 10);
        if (ageNum < 25) {
          throw new Error(language === 'en' ? 'MPs must be at least 25 years old.' : 'सांसदों की आयु कम कम 25 वर्ष होनी चाहिए।');
        }

        const { error } = await supabase.from('mps').update({
          first_name: nameParts.first_name,
          middle_name: nameParts.middle_name,
          last_name: nameParts.last_name,
          age: ageNum,
          political_party: mpParty,
          official_phone: mpPhone,
          constituency_id: mpConstituency,
          term_start: mpTermStart,
          term_end: mpTermEnd || null
        }).eq('id', user.id);

        if (error) throw error;
      }

      setSuccessMsg(language === 'en' ? 'Details saved successfully! Redirecting...' : 'विवरण सफलतापूर्वक सहेजा गया! रीडायरेक्ट किया जा रहा है...');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred while saving your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formScreen}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={styles.container}>
        <div className={styles.formCard}>
          
          <div className={styles.formHeader}>
            <h2>
              {language === 'en' ? (
                <>Complete <span>{formRole === 'MP' ? 'MP Profile' : 'Citizen Details'}</span></>
              ) : (
                <><span>{formRole === 'MP' ? 'सांसद प्रोफ़ाइल' : 'नागरिक विवरण'}</span> पूरा करें</>
              )}
            </h2>
            <p>
              {language === 'en' 
                ? 'Please complete the setup to access your personalized constituency board.' 
                : 'अपने व्यक्तिगत निर्वाचन क्षेत्र बोर्ड तक पहुंचने के लिए सेटअप पूरा करें।'}
            </p>
          </div>

          {!user && (
            <div className={`${styles.alertBox} ${styles.alertBoxSuccess}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>
                {language === 'en' 
                  ? 'Form Preview Mode: You can view and test this form without logging in.' 
                  : 'फ़ॉर्म पूर्वावलोकन मोड: आप बिना लॉगिन किए इस फ़ॉर्म को देख और परीक्षण कर सकते हैं।'}
              </span>
            </div>
          )}

          {errorMsg && (
            <div className={styles.alertBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className={`${styles.alertBox} ${styles.alertBoxSuccess}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            {/* Full Name (Read-only if logged in, editable for preview) */}
            <div className={styles.formGroup}>
              <label>{language === 'en' ? 'Full Name' : 'पूरा नाम'}</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={language === 'en' ? 'Enter your full name' : 'अपना पूरा नाम दर्ज करें'}
                  disabled={!!user}
                  required
                />
              </div>
            </div>
            
            {/* Age */}
            <div className={styles.formGroup}>
              <label>{language === 'en' ? 'Age' : 'आयु'}</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <input 
                  type="number" 
                  className={styles.formInput} 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={language === 'en' ? 'Enter your age' : 'अपनी आयु दर्ज करें'}
                  min="1"
                  max="120"
                  required
                />
              </div>
            </div>

            {formRole === 'Citizen' ? (
              <>
                {/* Phone Number */}
                <div className={styles.formGroup}>
                  <label>{language === 'en' ? 'Phone Number' : 'फ़ोन नंबर'}</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <input 
                      type="tel" 
                      className={styles.formInput} 
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      placeholder={language === 'en' ? 'Enter 10-digit mobile number' : '10 अंकों का मोबाइल नंबर दर्ज करें'}
                      required
                    />
                  </div>
                </div>

                {/* Ward */}
                <div className={styles.formGroup}>
                  <label>{language === 'en' ? 'Ward Number / Location' : 'वार्ड संख्या / स्थान'}</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <select 
                      className={styles.formSelect}
                      value={citizenWard}
                      onChange={(e) => setCitizenWard(e.target.value)}
                      required
                    >
                      <option value="">{language === 'en' ? '-- Select Ward --' : '-- वार्ड चुनें --'}</option>
                      {wards.map((w) => (
                        <option key={w.id} value={w.id}>
                          {w.ward_name} ({language === 'en' ? 'Ward' : 'वार्ड'} {w.ward_number})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className={styles.formGroup}>
                  <label>{language === 'en' ? 'Address (Optional)' : 'पता (वैकल्पिक)'}</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} style={{top: '14px'}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <textarea 
                      className={styles.formTextarea}
                      value={citizenAddress}
                      onChange={(e) => setCitizenAddress(e.target.value)}
                      placeholder={language === 'en' ? 'Enter house, block or street details' : 'घर, ब्लॉक या सड़क का विवरण दर्ज करें'}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Official Phone */}
                <div className={styles.formGroup}>
                  <label>{language === 'en' ? 'Official Phone Number' : 'आधिकारिक फ़ोन नंबर'}</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <input 
                      type="tel" 
                      className={styles.formInput} 
                      value={mpPhone}
                      onChange={(e) => setMpPhone(e.target.value)}
                      placeholder={language === 'en' ? 'Enter official phone' : 'आधिकारिक फ़ोन नंबर दर्ज करें'}
                      required
                    />
                  </div>
                </div>

                {/* Political Party */}
                <div className={styles.formGroup}>
                  <label>{language === 'en' ? 'Political Party' : 'राजनीतिक दल'}</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                    <select 
                      className={styles.formSelect}
                      value={mpParty}
                      onChange={(e) => setMpParty(e.target.value)}
                      required
                    >
                      <option value="">{language === 'en' ? '-- Select Party --' : '-- दल चुनें --'}</option>
                      <option value="BJP">Bharatiya Janata Party (BJP)</option>
                      <option value="INC">Indian National Congress (INC)</option>
                      <option value="AAP">Aam Aadmi Party (AAP)</option>
                      <option value="AITC">All India Trinamool Congress (AITC)</option>
                      <option value="DMK">Dravida Munnetra Kazhagam (DMK)</option>
                      <option value="IND">Independent (IND)</option>
                    </select>
                  </div>
                </div>

                {/* Constituency */}
                <div className={styles.formGroup}>
                  <label>{language === 'en' ? 'Constituency' : 'निर्वाचन क्षेत्र'}</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <select 
                      className={styles.formSelect}
                      value={mpConstituency}
                      onChange={(e) => setMpConstituency(e.target.value)}
                      required
                    >
                      <option value="">{language === 'en' ? '-- Select Constituency --' : '-- निर्वाचन क्षेत्र चुनें --'}</option>
                      {constituencies.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.constituency_name} ({c.state})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Term Grid */}
                <div className={styles.formGrid}>
                  {/* Term Start */}
                  <div className={styles.formGroup}>
                    <label>{language === 'en' ? 'Term Start' : 'कार्यकाल प्रारंभ'}</label>
                    <div className={styles.inputWrapper}>
                      <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      <input 
                        type="date" 
                        className={styles.formInput} 
                        value={mpTermStart}
                        onChange={(e) => setMpTermStart(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Term End */}
                  <div className={styles.formGroup}>
                    <label>{language === 'en' ? 'Term End (Optional)' : 'कार्यकाल समाप्ति (वैकल्पिक)'}</label>
                    <div className={styles.inputWrapper}>
                      <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                      <input 
                        type="date" 
                        className={styles.formInput} 
                        value={mpTermEnd}
                        onChange={(e) => setMpTermEnd(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <button 
              type="submit" 
              className={styles.btnSubmit}
              disabled={isLoading}
            >
              {isLoading && <div className={styles.loadingSpinner} />}
              <span>
                {isLoading 
                  ? (language === 'en' ? 'Saving...' : 'सहेज रहा है...') 
                  : (language === 'en' ? 'Submit Details' : 'विवरण सबमिट करें')}
              </span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default FormScreen;
