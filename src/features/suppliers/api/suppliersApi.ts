import { mockResponse } from '../../../shared/api/mock';

export interface Supplier {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  district: string;
  city: string;
  /** What the supplier makes to order, as the supplier wrote it. */
  makes: string;
  minBoxes: number;
  /** "Giao toàn quốc" or the province it delivers to. */
  reach: string;
  /** Also sells ready-made products in a Shop; false = "Chỉ nhận đặt hàng". */
  hasShop: boolean;
  rating: number | null;
}

/** Sample suppliers from the wireframe (m1-0, m3-2); the supplier endpoints do not exist yet. */
const mockSuppliers: Supplier[] = [
  { id: 'nghe-nhan', name: 'Xưởng Bánh Nghệ Nhân', shortName: 'Nghệ Nhân', initials: 'NN', district: 'Ba Đình', city: 'Hà Nội', makes: 'In logo · hộp riêng', minBoxes: 20, reach: 'Giao toàn quốc', hasShop: true, rating: 4.9 },
  { id: 'trang-vang', name: 'Bánh Cổ Truyền Trăng Vàng', shortName: 'Trăng Vàng', initials: 'TV', district: 'Hoàn Kiếm', city: 'Hà Nội', makes: 'Hộp sơn mài · nhân theo yêu cầu', minBoxes: 10, reach: 'Giao Hà Nội', hasShop: true, rating: 4.8 },
  { id: 'minh-hoa', name: 'Xưởng Minh Hòa', shortName: 'Minh Hòa', initials: 'MH', district: 'Đống Đa', city: 'Hà Nội', makes: 'In logo · thiệp kèm', minBoxes: 50, reach: 'Giao toàn quốc', hasShop: false, rating: null },
  { id: 'moc-an', name: 'Xưởng Bánh Mộc An', shortName: 'Mộc An', initials: 'MA', district: 'Cầu Giấy', city: 'Hà Nội', makes: 'Bánh chay · hộp mây tre', minBoxes: 30, reach: 'Giao Hà Nội', hasShop: false, rating: 4.7 },
];

/** Suppliers shown on the home page, in this order. */
const featuredIds = ['nghe-nhan', 'trang-vang', 'minh-hoa', 'moc-an'];

export function fetchSuppliers(): Promise<Supplier[]> {
  return mockResponse(mockSuppliers);
}

export function fetchFeaturedSuppliers(): Promise<Supplier[]> {
  return mockResponse(featuredIds.map((id) => mockSuppliers.find((s) => s.id === id)).filter((s): s is Supplier => Boolean(s)));
}
