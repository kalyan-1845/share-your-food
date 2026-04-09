const STORAGE_KEYS = {
  USER: 'seva_user',
  DONATIONS: 'seva_donations',
  NGOS: 'seva_ngos'
};

const INITIAL_NGOS = [
  {
    id: 0,
    name: "Helping Hands NGO",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "Providing healthy meals to underprivileged children in Mumbai.",
    location: "Mumbai, Maharashtra",
    needed: "Bulk grains, Cooked food",
    rating: 4.8
  },
  {
    id: 1,
    name: "Food For All",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "A community kitchen serving daily meals to daily wage workers.",
    location: "Delhi, NCR",
    needed: "Fresh vegetables, Bread",
    rating: 4.5
  },
  {
    id: 2,
    name: "Seva Foundation",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    description: "Mobilizing volunteers to collect surplus food from weddings and parties.",
    location: "Pune, Maharashtra",
    needed: "Leftover party food, Grains",
    rating: 4.9
  }
];

const mockService = {
  // Initialize storage
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.NGOS)) {
      localStorage.setItem(STORAGE_KEYS.NGOS, JSON.stringify(INITIAL_NGOS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
      localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify([]));
    }
  },

  // Auth methods
  signup: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
        resolve({ user: userData });
      }, 800);
    });
  },

  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
        if (user && user.email === email && user.password === password) {
          resolve({ user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },

  getUser: async () => {
    return new Promise((resolve) => {
      const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER));
      resolve(user);
    });
  },

  logout: async () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return true;
  },

  // Data methods
  getNgos: async () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.NGOS)) || INITIAL_NGOS;
  },

  postDonation: async (donation) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const donations = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS)) || [];
        const newDonation = { ...donation, id: Date.now(), status: 'Pending' };
        donations.push(newDonation);
        localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
        resolve(newDonation);
      }, 1000);
    });
  },

  getDonations: async () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS)) || [];
  }
};

export default mockService;
