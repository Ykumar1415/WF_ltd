import { create } from 'zustand'

const useUserStore = create((set) => ({
  date: '',
  setDate: (name) => set({ date: name }),
  roles: [],
  bp: false,
  item: false,
  channels: [],
  subchannels: [],
  dist: [],
  zone: [],
  states: [],
  region: [],
  city: [],
  brand: [],
  pack: [],
  productfamily: [],
  productline: [],
  selectedSku: [],
  StoreDataList: [],
  StoreDataStart: 0,
  StoreDataEnd: 0,
  channel_count: 0,
  sub_channel_count: 0,
  dist_type_count: 0,
  zone_count: 0,
  state_count: 0,
  region_count: 0,
  city_count: 0,

  selectedDistributors: [],
  // 88888888888888888888888888888888888
  allDistributors: [],
  isAllSelected: false,
  setAllSelected: () => set(() => ({ isAllSelected: true })),
  unsetAllSelected: () => (() => ({ isAllSelected: false })),

  pushallDistributors: (newChannel) =>
    set((state) => ({ allDistributors: newChannel })),

  removeallDistributors: () =>
    set((state) => ({ allDistributors: [] })),
  // 8888888888888888888888888888888888888
  setBp: () => set(() => ({ bp: true })),
  setItem: () => set(() => ({ item: true })),
  setRoles: (details) => set(() => ({ roles: details })),
  pushChannel: (newChannel) =>
    set((state) => ({ channels: [...state.channels, newChannel] })),

  filterChannels: (filterValue) =>
    set((state) => ({
      channels: state.channels.filter((channel) => channel !== filterValue),
    })),
  pushsubChannel: (newsubChannel) =>
    set((state) => ({ subchannels: [...state.subchannels, newsubChannel] })),

  filtersubChannels: (filterValue) =>
    set((state) => ({
      subchannels: state.subchannels.filter((subchannel) => subchannel !== filterValue),
    })),
  pushdist: (newsubChannel) =>
    set((state) => ({ dist: [...state.dist, newsubChannel] })),

  filterdist: (filterValue) =>
    set((state) => ({
      dist: state.dist.filter((dist) => dist !== filterValue),
    })),
  pushZone: (newChannel) =>
    set((state) => ({ zone: [...state.zone, newChannel] })),

  filterZone: (filterValue) =>
    set((state) => ({
      zone: state.zone.filter((i) => i !== filterValue),
    })),
  pushState: (newChannel) =>
    set((state) => ({ states: [...state.states, newChannel] })),

  filterState: (filterValue) =>
    set((state) => ({
      states: state.states.filter((i) => i !== filterValue),
    })),
  pushRegion: (newChannel) =>
    set((state) => ({ region: [...state.region, newChannel] })),

  filterRegion: (filterValue) =>
    set((state) => ({
      region: state.region.filter((i) => i !== filterValue),
    })),
  pushCity: (newChannel) =>
    set((state) => ({ city: [...state.city, newChannel] })),

  filterCity: (filterValue) =>
    set((state) => ({
      city: state.city.filter((i) => i !== filterValue),
    })),
  pushBrand: (newChannel) =>
    set((state) => ({ brand: [...state.brand, newChannel] })),

  filterBrand: (filterValue) =>
    set((state) => ({
      brand: state.brand.filter((i) => i !== filterValue),
    })),
  pushPack: (newChannel) =>
    set((state) => ({ pack: [...state.pack, newChannel] })),

  filterPack: (filterValue) =>
    set((state) => ({
      pack: state.pack.filter((i) => i !== filterValue),
    })),
  pushFamily: (newChannel) =>
    set((state) => ({ productfamily: [...state.productfamily, newChannel] })),

  filterFamily: (filterValue) =>
    set((state) => ({
      productfamily: state.productfamily.filter((i) => i !== filterValue),
    })),
  pushLine: (newChannel) =>
    set((state) => ({ productline: [...state.productline, newChannel] })),

  filterLine: (filterValue) =>
    set((state) => ({
      productline: state.productline.filter((i) => i !== filterValue),
    })),
  // push distributors in an array
  pushSelectedDistributors: (newChannel) =>
    set((state) => ({ selectedDistributors: [...state.selectedDistributors, newChannel] })),
  pushSelectedSku: (newChannel) =>
    set((state) => ({ selectedSku: [...state.selectedSku, newChannel] })),
  // add all the distributors in an array
  pushAllSelectedDistributors: (newChannel) =>
    set((state) => ({ selectedDistributors: newChannel })),

  // remove all the selected distributors
  removeAllSelectedDistributors: () =>
    set((state) => ({ selectedDistributors: [] })),
  // remove a single distributor
  removeSelectedDistributor: (filterValue) =>
    set((state) => ({
      selectedDistributors: state.selectedDistributors.filter((i) => i !== filterValue),
    })),

  // add data in StoreDataList 
  pushStoreDataList: (newChannel) =>
    set((state) => ({ StoreDataList: [...state.StoreDataList, newChannel] })),
  // set start and end index of data
  setStoreDataStart: (newChannel) =>
    set((state) => ({ StoreDataStart: newChannel })),
  setStoreDataEnd: (newChannel) =>
    set((state) => ({ StoreDataEnd: newChannel })),
  // set count of all filters
  setChannelCount: (newChannel) =>
    set((state) => ({ channel_count: newChannel })),
  setSubChannelCount: (newChannel) =>
    set((state) => ({ sub_channel_count: newChannel })),
  setDistTypeCount: (newChannel) =>
    set((state) => ({ dist_type_count: newChannel })),
  setZoneCount: (newChannel) =>
    set((state) => ({ zone_count: newChannel })),
  setStateCount: (newChannel) =>
    set((state) => ({ state_count: newChannel })),
  setRegionCount: (newChannel) =>
    set((state) => ({ region_count: newChannel })),
  setCityCount: (newChannel) =>
    set((state) => ({ city_count: newChannel }))



}))

export default useUserStore;