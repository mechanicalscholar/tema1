import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Music, Share2, Apple as WhatsApp, Download, UserCheck, PauseCircle, PlayCircle, Heart, Gift } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: '1',
    message: ''
  });
  const [rsvpList, setRsvpList] = useState<Array<any>>([]);
  const [activeTab, setActiveTab] = useState('ceremony');

  const eventDate = new Date('2024-12-31T18:00:00');

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    }

    const calculateTimeLeft = () => {
      const difference = +eventDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
      const audio = document.querySelector('audio');
      if (audio) audio.pause();
    };
  }, []);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpList(prev => [...prev, { ...formData, date: new Date().toLocaleString() }]);
    setFormData({
      name: '',
      email: '',
      attending: 'yes',
      guests: '1',
      message: ''
    });
  };

  const addToGoogleCalendar = () => {
    const startDate = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(eventDate.getTime() + (5 * 60 * 60 * 1000))
      .toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Sarah & Michael\'s Wedding')}&dates=${startDate}/${endDate}&details=${encodeURIComponent('We are delighted to invite you to our wedding celebration!')}&location=${encodeURIComponent('The Grand Plaza Hotel, 5678 Luxury Avenue')}`;
    
    window.open(calendarUrl, '_blank');
  };

  const toggleMusic = () => {
    const audio = document.querySelector('audio');
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const timelineEvents = [
    {
      year: '2019',
      title: 'First Meeting',
      description: 'We first met at a local coffee shop, where a chance encounter turned into hours of conversation.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80'
    },
    {
      year: '2020',
      title: 'Dating',
      description: 'Through the challenges of the year, our love grew stronger as we supported each other.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80'
    },
    {
      year: '2023',
      title: 'The Proposal',
      description: 'Under the stars at our favorite spot, Michael got down on one knee and Sarah said yes!',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80'
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80'
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div 
        className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        <div className="absolute inset-8 border border-[#d4af37] opacity-50"></div>
        
        <div className="text-center p-12 relative z-10 max-w-4xl">
          <div className="mb-8 text-[#d4af37]">IN THE NAME OF GOD, THE MOST GRACIOUS, THE MOST MERCIFUL</div>
          <div className="mb-12 text-xl">With great joy and gratitude, we invite you to share in our happiness</div>
          <h1 className="text-7xl font-light mb-6 tracking-wider">Sarah & Michael</h1>
          <p className="text-xl mb-8 tracking-widest">DECEMBER 31ST, 2024</p>
          
          <div className="mt-12 text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-light mb-4 text-[#d4af37]">Together with our families</h3>
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <p className="text-xl mb-2">Mr. & Mrs. Johnson</p>
                  <p className="text-gray-300">Parents of the Bride</p>
                </div>
                <div>
                  <p className="text-xl mb-2">Mr. & Mrs. Williams</p>
                  <p className="text-gray-300">Parents of the Groom</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 text-[#d4af37] mt-12">
            <div className="text-center">
              <Clock className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm tracking-wider">6:00 PM</span>
            </div>
            <div className="w-px h-8 bg-[#d4af37] opacity-50"></div>
            <div className="text-center">
              <MapPin className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm tracking-wider">THE GRAND PLAZA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-black/80 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6 md:gap-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center min-w-[80px] md:min-w-[120px]">
                <div className="text-3xl md:text-5xl font-light text-[#d4af37] mb-1">{value}</div>
                <div className="text-xs md:text-sm tracking-widest uppercase">{unit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-16 tracking-wider text-[#d4af37]">The Bride & Groom</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="relative mb-6 aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1523264629844-40dd6bf17c2b?auto=format&fit=crop&q=80"
                  alt="The Bride"
                  className="w-full h-full object-cover rounded-full border-4 border-[#d4af37]"
                />
              </div>
              <h3 className="text-2xl font-light mb-2">Sarah Johnson</h3>
              <p className="text-gray-300">Daughter of Mr. & Mrs. Johnson</p>
            </div>
            <div className="text-center">
              <div className="relative mb-6 aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1620794108219-aedbaded4eea?auto=format&fit=crop&q=80"
                  alt="The Groom"
                  className="w-full h-full object-cover rounded-full border-4 border-[#d4af37]"
                />
              </div>
              <h3 className="text-2xl font-light mb-2">Michael Williams</h3>
              <p className="text-gray-300">Son of Mr. & Mrs. Williams</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-b from-black to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-16 tracking-wider text-[#d4af37]">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className="flex flex-col md:flex-row gap-8 mb-16">
                <div className="md:w-1/3">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg border border-[#d4af37]/30"
                  />
                </div>
                <div className="md:w-2/3 flex flex-col justify-center">
                  <div className="text-[#d4af37] text-xl mb-2">{event.year}</div>
                  <h3 className="text-2xl font-light mb-4">{event.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-light text-center mb-16 tracking-wider text-[#d4af37]">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <div key={index} className="aspect-square">
                <img 
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-b from-black to-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-light text-center mb-16 tracking-wider text-[#d4af37]">Wedding Events</h2>
            
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-lg border border-[#d4af37]/30 p-1">
                <button
                  className={`px-6 py-2 rounded-md ${activeTab === 'ceremony' ? 'bg-[#d4af37] text-black' : 'text-[#d4af37]'}`}
                  onClick={() => setActiveTab('ceremony')}
                >
                  Holy Ceremony
                </button>
                <button
                  className={`px-6 py-2 rounded-md ${activeTab === 'reception' ? 'bg-[#d4af37] text-black' : 'text-[#d4af37]'}`}
                  onClick={() => setActiveTab('reception')}
                >
                  Reception
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {activeTab === 'ceremony' ? (
                <>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-light mb-4">Holy Matrimony</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Join us as we exchange vows and celebrate our love in an intimate ceremony 
                      at St. Mary's Cathedral.
                    </p>
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#d4af37]" />
                        <span>December 31st, 2024</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#d4af37]" />
                        <span>4:00 PM - 5:30 PM</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#d4af37]" />
                        <span>St. Mary's Cathedral, 1234 Church Street</span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926!3d48.8583736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647834456789!5m2!1sen!2sus"
                        className="w-full h-64 rounded-lg border border-[#d4af37]/30"
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1601100623386-d24d0f70e910?auto=format&fit=crop&q=80"
                      alt="Church"
                      className="w-full h-full object-cover rounded-lg border border-[#d4af37]/30"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-light mb-4">Wedding Reception</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Following the ceremony, please join us for an evening of 
                      dinner, dancing, and celebration at The Grand Plaza Hotel.
                    </p>
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#d4af37]" />
                        <span>December 31st, 2024</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#d4af37]" />
                        <span>6:00 PM - 11:00 PM</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#d4af37]" />
                        <span>The Grand Plaza Hotel, 5678 Luxury Avenue</span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.2922926!3d48.8583736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647834456789!5m2!1sen!2sus"
                        className="w-full h-64 rounded-lg border border-[#d4af37]/30"
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80"
                      alt="Reception Venue"
                      className="w-full h-full object-cover rounded-lg border border-[#d4af37]/30"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-light text-center mb-16 tracking-wider text-[#d4af37]">RSVP</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <form onSubmit={handleRSVP} className="space-y-6">
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Attending?</label>
                    <select
                      className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors"
                      value={formData.attending}
                      onChange={(e) => setFormData({...formData, attending: e.target.value})}
                    >
                      <option value="yes">Yes, I'll be there!</option>
                      <option value="no">Sorry, I can't make it</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Number of Guests</label>
                    <select
                      className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    >
                      {[1,2,3,4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm tracking-wider mb-2">Message (Optional)</label>
                    <textarea
                      className="w-full px-4 py-3 bg-black/50 border border-[#d4af37]/30 rounded-lg focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-colors"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#d4af37] text-black font-medium tracking-wider hover:bg-[#c4a030] transition-colors rounded-lg"
                  >
                    SEND RSVP
                  </button>
                </form>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-light mb-6">Guest List</h3>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
                  {rsvpList.map((rsvp, index) => (
                    <div key={index} className="p-4 bg-black/30 rounded-lg border border-[#d4af37]/30">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-[#d4af37]">{rsvp.name}</h4>
                        <span className="text-xs text-gray-400">{rsvp.date}</span>
                      </div>
                      <p className="text-sm mb-2">Guests: {rsvp.guests}</p>
                      <p className="text-sm text-gray-300">{rsvp.message}</p>
                    </div>
                  ))}
                  {rsvpList.length === 0 && (
                    <p className="text-gray-400 text-center">No RSVPs yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-light text-center mb-16 tracking-wider text-[#d4af37]">Wedding Gift</h2>
            <p className="text-gray-300 mb-12 leading-relaxed">
              Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift,
              we have provided our account details below:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border border-[#d4af37]/30 rounded-lg">
                <h3 className="text-2xl font-light mb-4">Bank Transfer</h3>
                <div className="space-y-4 text-gray-300">
                  <p>Bank: Chase Bank</p>
                  <p>Account Name: Sarah Johnson</p>
                  <p>Account Number: XXXX-XXXX-1234</p>
                  <p>Routing Number: XXX-XXX-XXX</p>
                </div>
              </div>
              <div className="p-8 border border-[#d4af37]/30 rounded-lg">
                <h3 className="text-2xl font-light mb-4">Digital Wallet</h3>
                <div className="space-y-4 text-gray-300">
                  <p>PayPal: sarah@email.com</p>
                  <p>Venmo: @sarahjohnson</p>
                  <p>CashApp: $sarahjohnson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-light text-center mb-16 tracking-wider text-[#d4af37]">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-light mb-4">Dress Code</h3>
                <p className="text-gray-300 leading-relaxed">
                  Black tie optional. We kindly request formal attire in black, gold, or neutral tones.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-light mb-4">Special Notes</h3>
                <ul className="text-gray-300 space-y-3">
                  <li>• Ceremony begins promptly at 4:00 PM</li>
                  <li>• Photography is welcomed during designated times</li>
                  <li>• The venue is wheelchair accessible</li>
                  <li>• Complimentary valet parking available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-[#d4af37]/30 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <button
              onClick={toggleMusic}
              className="flex items-center gap-2 text-[#d4af37] hover:text-[#c4a030] transition-colors"
            >
              {isPlaying ? <PauseCircle className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
              <span className="text-sm tracking-wider">{isPlaying ? 'Pause Music' : 'Play Music'}</span>
            </button>
            
            <div className="flex gap-4 md:gap-8 flex-wrap">
              <button
                onClick={addToGoogleCalendar}
                className="flex items-center gap-2 text-[#d4af37] hover:text-[#c4a030] transition-colors"
              >
                <Calendar className="w-6 h-6" />
                <span className="text-sm tracking-wider">Add to Calendar</span>
              </button>
              
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#d4af37] hover:text-[#c4a030] transition-colors"
              >
                <WhatsApp className="w-6 h-6" />
                <span className="text-sm tracking-wider">Contact</span>
              </a>
              
              <button
                onClick={() => {
                  navigator.share({
                    title: 'Wedding Invitation',
                    text: 'Join us for our special day!',
                    url: window.location.href
                  }).catch(console.error);
                }}
                className="flex items-center gap-2 text-[#d4af37] hover:text-[#c4a030] transition-colors"
              >
                <Share2 className="w-6 h-6" />
                <span className="text-sm tracking-wider">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <audio autoPlay loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;