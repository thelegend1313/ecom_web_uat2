import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listColor } from "../api/color";
import { listBranch } from "../api/branch";
import { listPromo } from "../api/promo";
import { listRole } from "../api/role";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  color: [],
  branch: [],
  promo: [],
  role:[],
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
       color: [],
         branch: [],
    promo: [],
      products: [],
      carts: [],
      role: [],
    });
  },
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];
    const uniqe = _.unionWith(updateCart, _.isEqual);
    //set({ carts: uniqe });
    //console.log('Click add in carts', carts)
    //console.log('Click add in uniqe', uniqe)
    /*     
        // Step Uniqe
        
        set({ carts: uniqe }); */
   set({ carts: uniqe })

  },
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('Update Clickkkkk', productId, newQuantity)
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    // console.log('remove jaaaaa', productId)
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  actionLogin: async (form) => {
    const res = await axios.post("https://ecom-api-uat2-atwv4u02c-tees-projects-fc7a73b8.vercel.app/api/login", form);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
    getColor: async () => {
    try {
      const res = await listColor();
      set({ color: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getBranch: async () => {
    try {
      const res = await listBranch();
      set({ branch: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getPromo: async () => {
    try {
      const res = await listPromo();
      set({ promo: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getRole: async () => {
    try {
      const res = await listRole();
      set({ role: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      console.log(arg)
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: () => set({ carts: [] }),
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
