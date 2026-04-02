export type GeneralRank = 'C' | 'B' | 'A' | 'S' | 'S+' | 'SSS';

export type General = {
  id: string;
  name: string;
  country: string;
  era: string;
  origin: string;
  achievements: string;
  image: string;
};

export const GENERALS: General[] = [
  {
    "id": "general-0",
    "name": "Trần Hưng Đạo",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Tu sĩ",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=0"
  },
  {
    "id": "general-1",
    "name": "Quang Trung",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Quý tộc",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Quang%20Trung%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1"
  },
  {
    "id": "general-2",
    "name": "Lý Thường Kiệt",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%BD%20Th%C6%B0%E1%BB%9Dng%20Ki%E1%BB%87t%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=2"
  },
  {
    "id": "general-3",
    "name": "Lê Lợi",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20L%E1%BB%A3i%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=3"
  },
  {
    "id": "general-4",
    "name": "Hai Bà Trưng",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Hai%20B%C3%A0%20Tr%C6%B0ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=4"
  },
  {
    "id": "general-5",
    "name": "Bà Triệu",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Thương nhân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A0%20Tri%E1%BB%87u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=5"
  },
  {
    "id": "general-6",
    "name": "Ngô Quyền",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ng%C3%B4%20Quy%E1%BB%81n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=6"
  },
  {
    "id": "general-7",
    "name": "Đinh Bộ Lĩnh",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90inh%20B%E1%BB%99%20L%C4%A9nh%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=7"
  },
  {
    "id": "general-8",
    "name": "Lê Hoàn",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Ho%C3%A0n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=8"
  },
  {
    "id": "general-9",
    "name": "Lý Thái Tổ",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%BD%20Th%C3%A1i%20T%E1%BB%95%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=9"
  },
  {
    "id": "general-10",
    "name": "Trần Nhân Tông",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20Nh%C3%A2n%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=10"
  },
  {
    "id": "general-11",
    "name": "Lê Thánh Tông",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Tướng lĩnh",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Th%C3%A1nh%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=11"
  },
  {
    "id": "general-12",
    "name": "Nguyễn Trãi",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20Tr%C3%A3i%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=12"
  },
  {
    "id": "general-13",
    "name": "Nguyễn Bỉnh Khiêm",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=13"
  },
  {
    "id": "general-14",
    "name": "Phan Bội Châu",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Phan%20B%E1%BB%99i%20Ch%C3%A2u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=14"
  },
  {
    "id": "general-15",
    "name": "Phan Châu Trinh",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Hoàng gia",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Phan%20Ch%C3%A2u%20Trinh%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=15"
  },
  {
    "id": "general-16",
    "name": "Hoàng Hoa Thám",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Tướng lĩnh",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Hoa%20Th%C3%A1m%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=16"
  },
  {
    "id": "general-17",
    "name": "Võ Nguyên Giáp",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20Nguy%C3%AAn%20Gi%C3%A1p%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=17"
  },
  {
    "id": "general-18",
    "name": "Tôn Vũ",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20V%C5%A9%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=18"
  },
  {
    "id": "general-19",
    "name": "Gia Cát Lượng",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Nông dân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Gia%20C%C3%A1t%20L%C6%B0%E1%BB%A3ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=19"
  },
  {
    "id": "general-20",
    "name": "Tào Tháo",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%A0o%20Th%C3%A1o%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=20"
  },
  {
    "id": "general-21",
    "name": "Lưu Bị",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Quý tộc",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C6%B0u%20B%E1%BB%8B%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=21"
  },
  {
    "id": "general-22",
    "name": "Tôn Quyền",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20Quy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=22"
  },
  {
    "id": "general-23",
    "name": "Quan Vũ",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Quan%20V%C5%A9%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=23"
  },
  {
    "id": "general-24",
    "name": "Trương Phi",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Binh lính",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%C6%B0%C6%A1ng%20Phi%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=24"
  },
  {
    "id": "general-25",
    "name": "Triệu Vân",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Thợ thủ công",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tri%E1%BB%87u%20V%C3%A2n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=25"
  },
  {
    "id": "general-26",
    "name": "Mã Siêu",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20M%C3%A3%20Si%C3%AAu%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=26"
  },
  {
    "id": "general-27",
    "name": "Hoàng Trung",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Quý tộc",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Trung%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=27"
  },
  {
    "id": "general-28",
    "name": "Lã Bố",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Thợ thủ công",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%A3%20B%E1%BB%91%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=28"
  },
  {
    "id": "general-29",
    "name": "Điêu Thuyền",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Học giả",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90i%C3%AAu%20Thuy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=29"
  },
  {
    "id": "general-30",
    "name": "Võ Tắc Thiên",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Tướng lĩnh",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20T%E1%BA%AFc%20Thi%C3%AAn%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=30"
  },
  {
    "id": "general-31",
    "name": "Tần Thủy Hoàng",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%E1%BA%A7n%20Th%E1%BB%A7y%20Ho%C3%A0ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=31"
  },
  {
    "id": "general-32",
    "name": "Hán Vũ Đế",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Tướng lĩnh",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20H%C3%A1n%20V%C5%A9%20%C4%90%E1%BA%BF%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=32"
  },
  {
    "id": "general-33",
    "name": "Đường Thái Tông",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Thương nhân",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90%C6%B0%E1%BB%9Dng%20Th%C3%A1i%20T%C3%B4ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=33"
  },
  {
    "id": "general-34",
    "name": "Khang Hy",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Khang%20Hy%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=34"
  },
  {
    "id": "general-35",
    "name": "Càn Long",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Nông dân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20C%C3%A0n%20Long%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=35"
  },
  {
    "id": "general-36",
    "name": "Oda Nobunaga",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Tướng lĩnh",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Oda%20Nobunaga%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=36"
  },
  {
    "id": "general-37",
    "name": "Toyotomi Hideyoshi",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Tu sĩ",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Toyotomi%20Hideyoshi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=37"
  },
  {
    "id": "general-38",
    "name": "Tokugawa Ieyasu",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tokugawa%20Ieyasu%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=38"
  },
  {
    "id": "general-39",
    "name": "Takeda Shingen",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Nông dân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Takeda%20Shingen%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=39"
  },
  {
    "id": "general-40",
    "name": "Uesugi Kenshin",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Quý tộc",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Uesugi%20Kenshin%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=40"
  },
  {
    "id": "general-41",
    "name": "Date Masamune",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Date%20Masamune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=41"
  },
  {
    "id": "general-42",
    "name": "Sanada Yukimura",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sanada%20Yukimura%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=42"
  },
  {
    "id": "general-43",
    "name": "Miyamoto Musashi",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Thương nhân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Miyamoto%20Musashi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=43"
  },
  {
    "id": "general-44",
    "name": "Sasaki Kojiro",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Tướng lĩnh",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sasaki%20Kojiro%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=44"
  },
  {
    "id": "general-45",
    "name": "Minamoto no Yoshitsune",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Minamoto%20no%20Yoshitsune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=45"
  },
  {
    "id": "general-46",
    "name": "Kusunoki Masashige",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Nông dân",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Kusunoki%20Masashige%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=46"
  },
  {
    "id": "general-47",
    "name": "Napoleon Bonaparte",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Napoleon%20Bonaparte%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=47"
  },
  {
    "id": "general-48",
    "name": "Alexander Đại đế",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Tu sĩ",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=48"
  },
  {
    "id": "general-49",
    "name": "Julius Caesar",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Binh lính",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Julius%20Caesar%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=49"
  },
  {
    "id": "general-50",
    "name": "Hannibal Barca",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Thợ thủ công",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Hannibal%20Barca%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=50"
  },
  {
    "id": "general-51",
    "name": "Richard Tim Sư Tử",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Richard%20Tim%20S%C6%B0%20T%E1%BB%AD%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=51"
  },
  {
    "id": "general-52",
    "name": "Joan of Arc",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Thợ thủ công",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Joan%20of%20Arc%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=52"
  },
  {
    "id": "general-53",
    "name": "George Washington",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Thợ thủ công",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20George%20Washington%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=53"
  },
  {
    "id": "general-54",
    "name": "Winston Churchill",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Binh lính",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Winston%20Churchill%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=54"
  },
  {
    "id": "general-55",
    "name": "Arthur Wellesley",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Arthur%20Wellesley%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=55"
  },
  {
    "id": "general-56",
    "name": "Horatio Nelson",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Horatio%20Nelson%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=56"
  },
  {
    "id": "general-57",
    "name": "Frederick Đại đế",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Frederick%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=57"
  },
  {
    "id": "general-58",
    "name": "Peter Đại đế",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Peter%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=58"
  },
  {
    "id": "general-59",
    "name": "Catherine Đại đế",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Thương nhân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Catherine%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=59"
  },
  {
    "id": "general-60",
    "name": "Charlemagne",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Charlemagne%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=60"
  },
  {
    "id": "general-61",
    "name": "Leonidas",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Quý tộc",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Leonidas%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=61"
  },
  {
    "id": "general-62",
    "name": "Spartacus",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Spartacus%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=62"
  },
  {
    "id": "general-63",
    "name": "Thành Cát Tư Hãn",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Thương nhân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Th%C3%A0nh%20C%C3%A1t%20T%C6%B0%20H%C3%A3n%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=63"
  },
  {
    "id": "general-64",
    "name": "Saladin",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Quý tộc",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Saladin%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=64"
  },
  {
    "id": "general-65",
    "name": "Khalid ibn al-Walid",
    "country": "Thế giới",
    "era": "Trung cổ",
    "origin": "Binh lính",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Khalid%20ibn%20al-Walid%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=65"
  },
  {
    "id": "general-66",
    "name": "Yi Sun-sin",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Yi%20Sun-sin%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=66"
  },
  {
    "id": "general-67",
    "name": "Cyrus Đại đế",
    "country": "Thế giới",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Cyrus%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=67"
  },
  {
    "id": "general-68",
    "name": "Darius Đại đế",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Tu sĩ",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Darius%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=68"
  },
  {
    "id": "general-69",
    "name": "Xerxes",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Tướng lĩnh",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Xerxes%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=69"
  },
  {
    "id": "general-70",
    "name": "Attila",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Attila%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=70"
  },
  {
    "id": "general-71",
    "name": "Timur",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Thợ thủ công",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Timur%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=71"
  },
  {
    "id": "general-72",
    "name": "Suleiman",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Suleiman%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=72"
  },
  {
    "id": "general-73",
    "name": "Bá tước Dracula",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A1%20t%C6%B0%E1%BB%9Bc%20Dracula%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=73"
  },
  {
    "id": "general-clone-0",
    "name": "Tần Thủy Hoàng (Bản sao 1)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%E1%BA%A7n%20Th%E1%BB%A7y%20Ho%C3%A0ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1000"
  },
  {
    "id": "general-clone-1",
    "name": "Phan Bội Châu (Bản sao 2)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Học giả",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Phan%20B%E1%BB%99i%20Ch%C3%A2u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1001"
  },
  {
    "id": "general-clone-2",
    "name": "Oda Nobunaga (Bản sao 3)",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Oda%20Nobunaga%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1002"
  },
  {
    "id": "general-clone-3",
    "name": "Suleiman (Bản sao 4)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Quý tộc",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Suleiman%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1003"
  },
  {
    "id": "general-clone-4",
    "name": "Darius Đại đế (Bản sao 5)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Darius%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1004"
  },
  {
    "id": "general-clone-5",
    "name": "Tần Thủy Hoàng (Bản sao 6)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Quý tộc",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%E1%BA%A7n%20Th%E1%BB%A7y%20Ho%C3%A0ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1005"
  },
  {
    "id": "general-clone-6",
    "name": "Lê Hoàn (Bản sao 7)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Thương nhân",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Ho%C3%A0n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1006"
  },
  {
    "id": "general-clone-7",
    "name": "Miyamoto Musashi (Bản sao 8)",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Miyamoto%20Musashi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1007"
  },
  {
    "id": "general-clone-8",
    "name": "Lã Bố (Bản sao 9)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%A3%20B%E1%BB%91%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1008"
  },
  {
    "id": "general-clone-9",
    "name": "Võ Tắc Thiên (Bản sao 10)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Binh lính",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20T%E1%BA%AFc%20Thi%C3%AAn%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1009"
  },
  {
    "id": "general-clone-10",
    "name": "Spartacus (Bản sao 11)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Hoàng gia",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Spartacus%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1010"
  },
  {
    "id": "general-clone-11",
    "name": "Xerxes (Bản sao 12)",
    "country": "Thế giới",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Xerxes%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1011"
  },
  {
    "id": "general-clone-12",
    "name": "Hai Bà Trưng (Bản sao 13)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Tu sĩ",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Hai%20B%C3%A0%20Tr%C6%B0ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1012"
  },
  {
    "id": "general-clone-13",
    "name": "Tôn Vũ (Bản sao 14)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20V%C5%A9%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1013"
  },
  {
    "id": "general-clone-14",
    "name": "Frederick Đại đế (Bản sao 15)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Frederick%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1014"
  },
  {
    "id": "general-clone-15",
    "name": "Mã Siêu (Bản sao 16)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Thợ thủ công",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20M%C3%A3%20Si%C3%AAu%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1015"
  },
  {
    "id": "general-clone-16",
    "name": "Cyrus Đại đế (Bản sao 17)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Hoàng gia",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Cyrus%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1016"
  },
  {
    "id": "general-clone-17",
    "name": "Darius Đại đế (Bản sao 18)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Tướng lĩnh",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Darius%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1017"
  },
  {
    "id": "general-clone-18",
    "name": "George Washington (Bản sao 19)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Quý tộc",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20George%20Washington%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1018"
  },
  {
    "id": "general-clone-19",
    "name": "Saladin (Bản sao 20)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Saladin%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1019"
  },
  {
    "id": "general-clone-20",
    "name": "Winston Churchill (Bản sao 21)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Winston%20Churchill%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1020"
  },
  {
    "id": "general-clone-21",
    "name": "Nguyễn Trãi (Bản sao 22)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Học giả",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20Tr%C3%A3i%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1021"
  },
  {
    "id": "general-clone-22",
    "name": "Bà Triệu (Bản sao 23)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A0%20Tri%E1%BB%87u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1022"
  },
  {
    "id": "general-clone-23",
    "name": "Suleiman (Bản sao 24)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Binh lính",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Suleiman%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1023"
  },
  {
    "id": "general-clone-24",
    "name": "Đường Thái Tông (Bản sao 25)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90%C6%B0%E1%BB%9Dng%20Th%C3%A1i%20T%C3%B4ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1024"
  },
  {
    "id": "general-clone-25",
    "name": "Nguyễn Bỉnh Khiêm (Bản sao 26)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Hoàng gia",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1025"
  },
  {
    "id": "general-clone-26",
    "name": "Miyamoto Musashi (Bản sao 27)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Miyamoto%20Musashi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1026"
  },
  {
    "id": "general-clone-27",
    "name": "Triệu Vân (Bản sao 28)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Quý tộc",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tri%E1%BB%87u%20V%C3%A2n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1027"
  },
  {
    "id": "general-clone-28",
    "name": "Lã Bố (Bản sao 29)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%A3%20B%E1%BB%91%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1028"
  },
  {
    "id": "general-clone-29",
    "name": "Kusunoki Masashige (Bản sao 30)",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Kusunoki%20Masashige%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1029"
  },
  {
    "id": "general-clone-30",
    "name": "Oda Nobunaga (Bản sao 31)",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Oda%20Nobunaga%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1030"
  },
  {
    "id": "general-clone-31",
    "name": "Tôn Quyền (Bản sao 32)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20Quy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1031"
  },
  {
    "id": "general-clone-32",
    "name": "Bá tước Dracula (Bản sao 33)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Tướng lĩnh",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A1%20t%C6%B0%E1%BB%9Bc%20Dracula%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1032"
  },
  {
    "id": "general-clone-33",
    "name": "Quang Trung (Bản sao 34)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Thợ thủ công",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Quang%20Trung%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1033"
  },
  {
    "id": "general-clone-34",
    "name": "Khang Hy (Bản sao 35)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Khang%20Hy%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1034"
  },
  {
    "id": "general-clone-35",
    "name": "Arthur Wellesley (Bản sao 36)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Nông dân",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Arthur%20Wellesley%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1035"
  },
  {
    "id": "general-clone-36",
    "name": "Miyamoto Musashi (Bản sao 37)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Miyamoto%20Musashi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1036"
  },
  {
    "id": "general-clone-37",
    "name": "Peter Đại đế (Bản sao 38)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Peter%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1037"
  },
  {
    "id": "general-clone-38",
    "name": "Bà Triệu (Bản sao 39)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A0%20Tri%E1%BB%87u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1038"
  },
  {
    "id": "general-clone-39",
    "name": "Võ Tắc Thiên (Bản sao 40)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Thương nhân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20T%E1%BA%AFc%20Thi%C3%AAn%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1039"
  },
  {
    "id": "general-clone-40",
    "name": "Leonidas (Bản sao 41)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Leonidas%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1040"
  },
  {
    "id": "general-clone-41",
    "name": "Càn Long (Bản sao 42)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Tướng lĩnh",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20C%C3%A0n%20Long%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1041"
  },
  {
    "id": "general-clone-42",
    "name": "Timur (Bản sao 43)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Thương nhân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Timur%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1042"
  },
  {
    "id": "general-clone-43",
    "name": "Võ Tắc Thiên (Bản sao 44)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Tướng lĩnh",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20T%E1%BA%AFc%20Thi%C3%AAn%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1043"
  },
  {
    "id": "general-clone-44",
    "name": "Nguyễn Trãi (Bản sao 45)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Thợ thủ công",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20Tr%C3%A3i%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1044"
  },
  {
    "id": "general-clone-45",
    "name": "Đường Thái Tông (Bản sao 46)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90%C6%B0%E1%BB%9Dng%20Th%C3%A1i%20T%C3%B4ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1045"
  },
  {
    "id": "general-clone-46",
    "name": "Alexander Đại đế (Bản sao 47)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1046"
  },
  {
    "id": "general-clone-47",
    "name": "Peter Đại đế (Bản sao 48)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Peter%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1047"
  },
  {
    "id": "general-clone-48",
    "name": "Cyrus Đại đế (Bản sao 49)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Cyrus%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1048"
  },
  {
    "id": "general-clone-49",
    "name": "Hoàng Hoa Thám (Bản sao 50)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Hoa%20Th%C3%A1m%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1049"
  },
  {
    "id": "general-clone-50",
    "name": "Khang Hy (Bản sao 51)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Khang%20Hy%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1050"
  },
  {
    "id": "general-clone-51",
    "name": "Spartacus (Bản sao 52)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Spartacus%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1051"
  },
  {
    "id": "general-clone-52",
    "name": "Tôn Quyền (Bản sao 53)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Binh lính",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20Quy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1052"
  },
  {
    "id": "general-clone-53",
    "name": "Đinh Bộ Lĩnh (Bản sao 54)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90inh%20B%E1%BB%99%20L%C4%A9nh%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1053"
  },
  {
    "id": "general-clone-54",
    "name": "Richard Tim Sư Tử (Bản sao 55)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Richard%20Tim%20S%C6%B0%20T%E1%BB%AD%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1054"
  },
  {
    "id": "general-clone-55",
    "name": "Lê Hoàn (Bản sao 56)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Thợ thủ công",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Ho%C3%A0n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1055"
  },
  {
    "id": "general-clone-56",
    "name": "Minamoto no Yoshitsune (Bản sao 57)",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Minamoto%20no%20Yoshitsune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1056"
  },
  {
    "id": "general-clone-57",
    "name": "Trần Hưng Đạo (Bản sao 58)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Học giả",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1057"
  },
  {
    "id": "general-clone-58",
    "name": "Võ Nguyên Giáp (Bản sao 59)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20Nguy%C3%AAn%20Gi%C3%A1p%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1058"
  },
  {
    "id": "general-clone-59",
    "name": "Attila (Bản sao 60)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Attila%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1059"
  },
  {
    "id": "general-clone-60",
    "name": "Quan Vũ (Bản sao 61)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Quan%20V%C5%A9%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1060"
  },
  {
    "id": "general-clone-61",
    "name": "Hoàng Hoa Thám (Bản sao 62)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Tướng lĩnh",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Hoa%20Th%C3%A1m%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1061"
  },
  {
    "id": "general-clone-62",
    "name": "Bà Triệu (Bản sao 63)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Quý tộc",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A0%20Tri%E1%BB%87u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1062"
  },
  {
    "id": "general-clone-63",
    "name": "Tào Tháo (Bản sao 64)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%A0o%20Th%C3%A1o%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1063"
  },
  {
    "id": "general-clone-64",
    "name": "Võ Tắc Thiên (Bản sao 65)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Binh lính",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20T%E1%BA%AFc%20Thi%C3%AAn%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1064"
  },
  {
    "id": "general-clone-65",
    "name": "Quan Vũ (Bản sao 66)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Quý tộc",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Quan%20V%C5%A9%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1065"
  },
  {
    "id": "general-clone-66",
    "name": "Hannibal Barca (Bản sao 67)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Hoàng gia",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Hannibal%20Barca%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1066"
  },
  {
    "id": "general-clone-67",
    "name": "Lê Lợi (Bản sao 68)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Tướng lĩnh",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20L%E1%BB%A3i%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1067"
  },
  {
    "id": "general-clone-68",
    "name": "Cyrus Đại đế (Bản sao 69)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Học giả",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Cyrus%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1068"
  },
  {
    "id": "general-clone-69",
    "name": "Tôn Vũ (Bản sao 70)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Binh lính",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20V%C5%A9%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1069"
  },
  {
    "id": "general-clone-70",
    "name": "Lý Thái Tổ (Bản sao 71)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Binh lính",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%BD%20Th%C3%A1i%20T%E1%BB%95%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1070"
  },
  {
    "id": "general-clone-71",
    "name": "Winston Churchill (Bản sao 72)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Quý tộc",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Winston%20Churchill%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1071"
  },
  {
    "id": "general-clone-72",
    "name": "Điêu Thuyền (Bản sao 73)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90i%C3%AAu%20Thuy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1072"
  },
  {
    "id": "general-clone-73",
    "name": "Hoàng Trung (Bản sao 74)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Tướng lĩnh",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Trung%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1073"
  },
  {
    "id": "general-clone-74",
    "name": "Tần Thủy Hoàng (Bản sao 75)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%E1%BA%A7n%20Th%E1%BB%A7y%20Ho%C3%A0ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1074"
  },
  {
    "id": "general-clone-75",
    "name": "Charlemagne (Bản sao 76)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Thợ thủ công",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Charlemagne%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1075"
  },
  {
    "id": "general-clone-76",
    "name": "Napoleon Bonaparte (Bản sao 77)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Binh lính",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Napoleon%20Bonaparte%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1076"
  },
  {
    "id": "general-clone-77",
    "name": "Timur (Bản sao 78)",
    "country": "Thế giới",
    "era": "Trung cổ",
    "origin": "Binh lính",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Timur%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1077"
  },
  {
    "id": "general-clone-78",
    "name": "Takeda Shingen (Bản sao 79)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Tướng lĩnh",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Takeda%20Shingen%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1078"
  },
  {
    "id": "general-clone-79",
    "name": "Bà Triệu (Bản sao 80)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A0%20Tri%E1%BB%87u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1079"
  },
  {
    "id": "general-clone-80",
    "name": "Arthur Wellesley (Bản sao 81)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Thợ thủ công",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Arthur%20Wellesley%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1080"
  },
  {
    "id": "general-clone-81",
    "name": "Spartacus (Bản sao 82)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Thương nhân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Spartacus%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1081"
  },
  {
    "id": "general-clone-82",
    "name": "Trần Nhân Tông (Bản sao 83)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20Nh%C3%A2n%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1082"
  },
  {
    "id": "general-clone-83",
    "name": "Gia Cát Lượng (Bản sao 84)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Gia%20C%C3%A1t%20L%C6%B0%E1%BB%A3ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1083"
  },
  {
    "id": "general-clone-84",
    "name": "Lý Thường Kiệt (Bản sao 85)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Binh lính",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%BD%20Th%C6%B0%E1%BB%9Dng%20Ki%E1%BB%87t%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1084"
  },
  {
    "id": "general-clone-85",
    "name": "Spartacus (Bản sao 86)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Spartacus%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1085"
  },
  {
    "id": "general-clone-86",
    "name": "Phan Bội Châu (Bản sao 87)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Tướng lĩnh",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Phan%20B%E1%BB%99i%20Ch%C3%A2u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1086"
  },
  {
    "id": "general-clone-87",
    "name": "Charlemagne (Bản sao 88)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Charlemagne%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1087"
  },
  {
    "id": "general-clone-88",
    "name": "Nguyễn Bỉnh Khiêm (Bản sao 89)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Binh lính",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1088"
  },
  {
    "id": "general-clone-89",
    "name": "Trần Nhân Tông (Bản sao 90)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20Nh%C3%A2n%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1089"
  },
  {
    "id": "general-clone-90",
    "name": "Ngô Quyền (Bản sao 91)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Thương nhân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ng%C3%B4%20Quy%E1%BB%81n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1090"
  },
  {
    "id": "general-clone-91",
    "name": "Alexander Đại đế (Bản sao 92)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Học giả",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1091"
  },
  {
    "id": "general-clone-92",
    "name": "Catherine Đại đế (Bản sao 93)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Thương nhân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Catherine%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1092"
  },
  {
    "id": "general-clone-93",
    "name": "Darius Đại đế (Bản sao 94)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Darius%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1093"
  },
  {
    "id": "general-clone-94",
    "name": "Lý Thường Kiệt (Bản sao 95)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Thợ thủ công",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%BD%20Th%C6%B0%E1%BB%9Dng%20Ki%E1%BB%87t%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1094"
  },
  {
    "id": "general-clone-95",
    "name": "Xerxes (Bản sao 96)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Xerxes%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1095"
  },
  {
    "id": "general-clone-96",
    "name": "Horatio Nelson (Bản sao 97)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Horatio%20Nelson%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1096"
  },
  {
    "id": "general-clone-97",
    "name": "Khalid ibn al-Walid (Bản sao 98)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Thợ thủ công",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Khalid%20ibn%20al-Walid%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1097"
  },
  {
    "id": "general-clone-98",
    "name": "Sasaki Kojiro (Bản sao 99)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sasaki%20Kojiro%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1098"
  },
  {
    "id": "general-clone-99",
    "name": "Suleiman (Bản sao 100)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Thương nhân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Suleiman%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1099"
  },
  {
    "id": "general-clone-100",
    "name": "Kusunoki Masashige (Bản sao 101)",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Binh lính",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Kusunoki%20Masashige%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1100"
  },
  {
    "id": "general-clone-101",
    "name": "Sasaki Kojiro (Bản sao 102)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sasaki%20Kojiro%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1101"
  },
  {
    "id": "general-clone-102",
    "name": "Leonidas (Bản sao 103)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Thợ thủ công",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Leonidas%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1102"
  },
  {
    "id": "general-clone-103",
    "name": "Trương Phi (Bản sao 104)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Học giả",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%C6%B0%C6%A1ng%20Phi%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1103"
  },
  {
    "id": "general-clone-104",
    "name": "Alexander Đại đế (Bản sao 105)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1104"
  },
  {
    "id": "general-clone-105",
    "name": "Leonidas (Bản sao 106)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Leonidas%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1105"
  },
  {
    "id": "general-clone-106",
    "name": "Napoleon Bonaparte (Bản sao 107)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Napoleon%20Bonaparte%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1106"
  },
  {
    "id": "general-clone-107",
    "name": "George Washington (Bản sao 108)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20George%20Washington%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1107"
  },
  {
    "id": "general-clone-108",
    "name": "Lý Thái Tổ (Bản sao 109)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Hoàng gia",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%BD%20Th%C3%A1i%20T%E1%BB%95%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1108"
  },
  {
    "id": "general-clone-109",
    "name": "Mã Siêu (Bản sao 110)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20M%C3%A3%20Si%C3%AAu%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1109"
  },
  {
    "id": "general-clone-110",
    "name": "Thành Cát Tư Hãn (Bản sao 111)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Th%C3%A0nh%20C%C3%A1t%20T%C6%B0%20H%C3%A3n%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1110"
  },
  {
    "id": "general-clone-111",
    "name": "Trần Nhân Tông (Bản sao 112)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20Nh%C3%A2n%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1111"
  },
  {
    "id": "general-clone-112",
    "name": "Frederick Đại đế (Bản sao 113)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Frederick%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1112"
  },
  {
    "id": "general-clone-113",
    "name": "Napoleon Bonaparte (Bản sao 114)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Thợ thủ công",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Napoleon%20Bonaparte%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1113"
  },
  {
    "id": "general-clone-114",
    "name": "Tokugawa Ieyasu (Bản sao 115)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tokugawa%20Ieyasu%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1114"
  },
  {
    "id": "general-clone-115",
    "name": "Thành Cát Tư Hãn (Bản sao 116)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Th%C3%A0nh%20C%C3%A1t%20T%C6%B0%20H%C3%A3n%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1115"
  },
  {
    "id": "general-clone-116",
    "name": "Darius Đại đế (Bản sao 117)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Tướng lĩnh",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Darius%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1116"
  },
  {
    "id": "general-clone-117",
    "name": "Tần Thủy Hoàng (Bản sao 118)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%E1%BA%A7n%20Th%E1%BB%A7y%20Ho%C3%A0ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1117"
  },
  {
    "id": "general-clone-118",
    "name": "Khalid ibn al-Walid (Bản sao 119)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Khalid%20ibn%20al-Walid%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1118"
  },
  {
    "id": "general-clone-119",
    "name": "Takeda Shingen (Bản sao 120)",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Hoàng gia",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Takeda%20Shingen%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1119"
  },
  {
    "id": "general-clone-120",
    "name": "Joan of Arc (Bản sao 121)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Joan%20of%20Arc%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1120"
  },
  {
    "id": "general-clone-121",
    "name": "Tào Tháo (Bản sao 122)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%A0o%20Th%C3%A1o%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1121"
  },
  {
    "id": "general-clone-122",
    "name": "Tôn Vũ (Bản sao 123)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Hoàng gia",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20V%C5%A9%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1122"
  },
  {
    "id": "general-clone-123",
    "name": "Tào Tháo (Bản sao 124)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Hoàng gia",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%A0o%20Th%C3%A1o%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1123"
  },
  {
    "id": "general-clone-124",
    "name": "Kusunoki Masashige (Bản sao 125)",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Kusunoki%20Masashige%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1124"
  },
  {
    "id": "general-clone-125",
    "name": "Attila (Bản sao 126)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Binh lính",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Attila%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1125"
  },
  {
    "id": "general-clone-126",
    "name": "Darius Đại đế (Bản sao 127)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Thương nhân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Darius%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1126"
  },
  {
    "id": "general-clone-127",
    "name": "Nguyễn Trãi (Bản sao 128)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Quý tộc",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20Tr%C3%A3i%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1127"
  },
  {
    "id": "general-clone-128",
    "name": "Saladin (Bản sao 129)",
    "country": "Thế giới",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Saladin%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1128"
  },
  {
    "id": "general-clone-129",
    "name": "Sasaki Kojiro (Bản sao 130)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Thương nhân",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sasaki%20Kojiro%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1129"
  },
  {
    "id": "general-clone-130",
    "name": "Nguyễn Bỉnh Khiêm (Bản sao 131)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Hoàng gia",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1130"
  },
  {
    "id": "general-clone-131",
    "name": "George Washington (Bản sao 132)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Thương nhân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20George%20Washington%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1131"
  },
  {
    "id": "general-clone-132",
    "name": "Trần Nhân Tông (Bản sao 133)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Quý tộc",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20Nh%C3%A2n%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1132"
  },
  {
    "id": "general-clone-133",
    "name": "Catherine Đại đế (Bản sao 134)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Hoàng gia",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Catherine%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1133"
  },
  {
    "id": "general-clone-134",
    "name": "Richard Tim Sư Tử (Bản sao 135)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Thương nhân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Richard%20Tim%20S%C6%B0%20T%E1%BB%AD%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1134"
  },
  {
    "id": "general-clone-135",
    "name": "Ngô Quyền (Bản sao 136)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Binh lính",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ng%C3%B4%20Quy%E1%BB%81n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1135"
  },
  {
    "id": "general-clone-136",
    "name": "Horatio Nelson (Bản sao 137)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Thương nhân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Horatio%20Nelson%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1136"
  },
  {
    "id": "general-clone-137",
    "name": "Gia Cát Lượng (Bản sao 138)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Học giả",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Gia%20C%C3%A1t%20L%C6%B0%E1%BB%A3ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1137"
  },
  {
    "id": "general-clone-138",
    "name": "Miyamoto Musashi (Bản sao 139)",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Binh lính",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Miyamoto%20Musashi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1138"
  },
  {
    "id": "general-clone-139",
    "name": "Tokugawa Ieyasu (Bản sao 140)",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tokugawa%20Ieyasu%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1139"
  },
  {
    "id": "general-clone-140",
    "name": "Minamoto no Yoshitsune (Bản sao 141)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Hoàng gia",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Minamoto%20no%20Yoshitsune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1140"
  },
  {
    "id": "general-clone-141",
    "name": "Miyamoto Musashi (Bản sao 142)",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Miyamoto%20Musashi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1141"
  },
  {
    "id": "general-clone-142",
    "name": "Tôn Quyền (Bản sao 143)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Học giả",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20Quy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1142"
  },
  {
    "id": "general-clone-143",
    "name": "Gia Cát Lượng (Bản sao 144)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Thợ thủ công",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Gia%20C%C3%A1t%20L%C6%B0%E1%BB%A3ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1143"
  },
  {
    "id": "general-clone-144",
    "name": "Catherine Đại đế (Bản sao 145)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Quý tộc",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Catherine%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1144"
  },
  {
    "id": "general-clone-145",
    "name": "Nguyễn Bỉnh Khiêm (Bản sao 146)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1145"
  },
  {
    "id": "general-clone-146",
    "name": "Tokugawa Ieyasu (Bản sao 147)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Tu sĩ",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tokugawa%20Ieyasu%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1146"
  },
  {
    "id": "general-clone-147",
    "name": "Tào Tháo (Bản sao 148)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%A0o%20Th%C3%A1o%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1147"
  },
  {
    "id": "general-clone-148",
    "name": "Miyamoto Musashi (Bản sao 149)",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Miyamoto%20Musashi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1148"
  },
  {
    "id": "general-clone-149",
    "name": "Timur (Bản sao 150)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Timur%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1149"
  },
  {
    "id": "general-clone-150",
    "name": "Spartacus (Bản sao 151)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Spartacus%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1150"
  },
  {
    "id": "general-clone-151",
    "name": "Suleiman (Bản sao 152)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Thương nhân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Suleiman%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1151"
  },
  {
    "id": "general-clone-152",
    "name": "Tôn Quyền (Bản sao 153)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20Quy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1152"
  },
  {
    "id": "general-clone-153",
    "name": "Mã Siêu (Bản sao 154)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20M%C3%A3%20Si%C3%AAu%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1153"
  },
  {
    "id": "general-clone-154",
    "name": "Charlemagne (Bản sao 155)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Charlemagne%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1154"
  },
  {
    "id": "general-clone-155",
    "name": "Càn Long (Bản sao 156)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20C%C3%A0n%20Long%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1155"
  },
  {
    "id": "general-clone-156",
    "name": "Ngô Quyền (Bản sao 157)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ng%C3%B4%20Quy%E1%BB%81n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1156"
  },
  {
    "id": "general-clone-157",
    "name": "Tôn Quyền (Bản sao 158)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20Quy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1157"
  },
  {
    "id": "general-clone-158",
    "name": "Phan Châu Trinh (Bản sao 159)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Thợ thủ công",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Phan%20Ch%C3%A2u%20Trinh%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1158"
  },
  {
    "id": "general-clone-159",
    "name": "Leonidas (Bản sao 160)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Leonidas%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1159"
  },
  {
    "id": "general-clone-160",
    "name": "Xerxes (Bản sao 161)",
    "country": "Thế giới",
    "era": "Trung cổ",
    "origin": "Quý tộc",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Xerxes%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1160"
  },
  {
    "id": "general-clone-161",
    "name": "Alexander Đại đế (Bản sao 162)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Hoàng gia",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1161"
  },
  {
    "id": "general-clone-162",
    "name": "George Washington (Bản sao 163)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20George%20Washington%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1162"
  },
  {
    "id": "general-clone-163",
    "name": "Frederick Đại đế (Bản sao 164)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Tướng lĩnh",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Frederick%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1163"
  },
  {
    "id": "general-clone-164",
    "name": "Horatio Nelson (Bản sao 165)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Horatio%20Nelson%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1164"
  },
  {
    "id": "general-clone-165",
    "name": "Trương Phi (Bản sao 166)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%C6%B0%C6%A1ng%20Phi%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1165"
  },
  {
    "id": "general-clone-166",
    "name": "Hoàng Trung (Bản sao 167)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Hoàng gia",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Trung%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1166"
  },
  {
    "id": "general-clone-167",
    "name": "Trương Phi (Bản sao 168)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%C6%B0%C6%A1ng%20Phi%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1167"
  },
  {
    "id": "general-clone-168",
    "name": "Triệu Vân (Bản sao 169)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Tướng lĩnh",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tri%E1%BB%87u%20V%C3%A2n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1168"
  },
  {
    "id": "general-clone-169",
    "name": "Catherine Đại đế (Bản sao 170)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Tướng lĩnh",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Catherine%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1169"
  },
  {
    "id": "general-clone-170",
    "name": "Hoàng Hoa Thám (Bản sao 171)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Nông dân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Hoa%20Th%C3%A1m%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1170"
  },
  {
    "id": "general-clone-171",
    "name": "Frederick Đại đế (Bản sao 172)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Frederick%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1171"
  },
  {
    "id": "general-clone-172",
    "name": "Tần Thủy Hoàng (Bản sao 173)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%E1%BA%A7n%20Th%E1%BB%A7y%20Ho%C3%A0ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1172"
  },
  {
    "id": "general-clone-173",
    "name": "Trần Hưng Đạo (Bản sao 174)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Binh lính",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1173"
  },
  {
    "id": "general-clone-174",
    "name": "Cyrus Đại đế (Bản sao 175)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Cyrus%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1174"
  },
  {
    "id": "general-clone-175",
    "name": "Tokugawa Ieyasu (Bản sao 176)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Hoàng gia",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tokugawa%20Ieyasu%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1175"
  },
  {
    "id": "general-clone-176",
    "name": "Tần Thủy Hoàng (Bản sao 177)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%E1%BA%A7n%20Th%E1%BB%A7y%20Ho%C3%A0ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1176"
  },
  {
    "id": "general-clone-177",
    "name": "Date Masamune (Bản sao 178)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Quý tộc",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Date%20Masamune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1177"
  },
  {
    "id": "general-clone-178",
    "name": "Alexander Đại đế (Bản sao 179)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1178"
  },
  {
    "id": "general-clone-179",
    "name": "Charlemagne (Bản sao 180)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Charlemagne%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1179"
  },
  {
    "id": "general-clone-180",
    "name": "Tần Thủy Hoàng (Bản sao 181)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%E1%BA%A7n%20Th%E1%BB%A7y%20Ho%C3%A0ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1180"
  },
  {
    "id": "general-clone-181",
    "name": "Frederick Đại đế (Bản sao 182)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Thợ thủ công",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Frederick%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1181"
  },
  {
    "id": "general-clone-182",
    "name": "Miyamoto Musashi (Bản sao 183)",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Miyamoto%20Musashi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1182"
  },
  {
    "id": "general-clone-183",
    "name": "Hannibal Barca (Bản sao 184)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Hannibal%20Barca%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1183"
  },
  {
    "id": "general-clone-184",
    "name": "Spartacus (Bản sao 185)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Spartacus%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1184"
  },
  {
    "id": "general-clone-185",
    "name": "Charlemagne (Bản sao 186)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Charlemagne%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1185"
  },
  {
    "id": "general-clone-186",
    "name": "Trần Nhân Tông (Bản sao 187)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20Nh%C3%A2n%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1186"
  },
  {
    "id": "general-clone-187",
    "name": "Sasaki Kojiro (Bản sao 188)",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sasaki%20Kojiro%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1187"
  },
  {
    "id": "general-clone-188",
    "name": "Tôn Vũ (Bản sao 189)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20V%C5%A9%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1188"
  },
  {
    "id": "general-clone-189",
    "name": "Timur (Bản sao 190)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Tu sĩ",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Timur%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1189"
  },
  {
    "id": "general-clone-190",
    "name": "Tôn Quyền (Bản sao 191)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20Quy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1190"
  },
  {
    "id": "general-clone-191",
    "name": "Lê Hoàn (Bản sao 192)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Hoàng gia",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Ho%C3%A0n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1191"
  },
  {
    "id": "general-clone-192",
    "name": "Lã Bố (Bản sao 193)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Thợ thủ công",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%A3%20B%E1%BB%91%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1192"
  },
  {
    "id": "general-clone-193",
    "name": "Frederick Đại đế (Bản sao 194)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Binh lính",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Frederick%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1193"
  },
  {
    "id": "general-clone-194",
    "name": "Tokugawa Ieyasu (Bản sao 195)",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Thợ thủ công",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tokugawa%20Ieyasu%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1194"
  },
  {
    "id": "general-clone-195",
    "name": "Đinh Bộ Lĩnh (Bản sao 196)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90inh%20B%E1%BB%99%20L%C4%A9nh%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1195"
  },
  {
    "id": "general-clone-196",
    "name": "Yi Sun-sin (Bản sao 197)",
    "country": "Thế giới",
    "era": "Trung cổ",
    "origin": "Tướng lĩnh",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Yi%20Sun-sin%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1196"
  },
  {
    "id": "general-clone-197",
    "name": "Bà Triệu (Bản sao 198)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Học giả",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A0%20Tri%E1%BB%87u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1197"
  },
  {
    "id": "general-clone-198",
    "name": "Sanada Yukimura (Bản sao 199)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Thợ thủ công",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sanada%20Yukimura%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1198"
  },
  {
    "id": "general-clone-199",
    "name": "Saladin (Bản sao 200)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Nông dân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Saladin%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1199"
  },
  {
    "id": "general-clone-200",
    "name": "Thành Cát Tư Hãn (Bản sao 201)",
    "country": "Thế giới",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Th%C3%A0nh%20C%C3%A1t%20T%C6%B0%20H%C3%A3n%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1200"
  },
  {
    "id": "general-clone-201",
    "name": "Julius Caesar (Bản sao 202)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Julius%20Caesar%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1201"
  },
  {
    "id": "general-clone-202",
    "name": "Hai Bà Trưng (Bản sao 203)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Hai%20B%C3%A0%20Tr%C6%B0ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1202"
  },
  {
    "id": "general-clone-203",
    "name": "Hoàng Hoa Thám (Bản sao 204)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Hoa%20Th%C3%A1m%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1203"
  },
  {
    "id": "general-clone-204",
    "name": "Đinh Bộ Lĩnh (Bản sao 205)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90inh%20B%E1%BB%99%20L%C4%A9nh%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1204"
  },
  {
    "id": "general-clone-205",
    "name": "Tôn Quyền (Bản sao 206)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%B4n%20Quy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1205"
  },
  {
    "id": "general-clone-206",
    "name": "Richard Tim Sư Tử (Bản sao 207)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Tướng lĩnh",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Richard%20Tim%20S%C6%B0%20T%E1%BB%AD%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1206"
  },
  {
    "id": "general-clone-207",
    "name": "Điêu Thuyền (Bản sao 208)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Thợ thủ công",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90i%C3%AAu%20Thuy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1207"
  },
  {
    "id": "general-clone-208",
    "name": "Lã Bố (Bản sao 209)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%A3%20B%E1%BB%91%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1208"
  },
  {
    "id": "general-clone-209",
    "name": "Kusunoki Masashige (Bản sao 210)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Tướng lĩnh",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Kusunoki%20Masashige%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1209"
  },
  {
    "id": "general-clone-210",
    "name": "Hannibal Barca (Bản sao 211)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Hannibal%20Barca%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1210"
  },
  {
    "id": "general-clone-211",
    "name": "Takeda Shingen (Bản sao 212)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Takeda%20Shingen%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1211"
  },
  {
    "id": "general-clone-212",
    "name": "Timur (Bản sao 213)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Tướng lĩnh",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Timur%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1212"
  },
  {
    "id": "general-clone-213",
    "name": "Kusunoki Masashige (Bản sao 214)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Kusunoki%20Masashige%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1213"
  },
  {
    "id": "general-clone-214",
    "name": "Trương Phi (Bản sao 215)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%C6%B0%C6%A1ng%20Phi%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1214"
  },
  {
    "id": "general-clone-215",
    "name": "Lê Thánh Tông (Bản sao 216)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Học giả",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Th%C3%A1nh%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1215"
  },
  {
    "id": "general-clone-216",
    "name": "Khang Hy (Bản sao 217)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Thương nhân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Khang%20Hy%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1216"
  },
  {
    "id": "general-clone-217",
    "name": "Sanada Yukimura (Bản sao 218)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Tướng lĩnh",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sanada%20Yukimura%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1217"
  },
  {
    "id": "general-clone-218",
    "name": "Phan Bội Châu (Bản sao 219)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Phan%20B%E1%BB%99i%20Ch%C3%A2u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1218"
  },
  {
    "id": "general-clone-219",
    "name": "Takeda Shingen (Bản sao 220)",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Takeda%20Shingen%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1219"
  },
  {
    "id": "general-clone-220",
    "name": "Attila (Bản sao 221)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Attila%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1220"
  },
  {
    "id": "general-clone-221",
    "name": "Suleiman (Bản sao 222)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Binh lính",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Suleiman%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1221"
  },
  {
    "id": "general-clone-222",
    "name": "Trần Hưng Đạo (Bản sao 223)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Thương nhân",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1222"
  },
  {
    "id": "general-clone-223",
    "name": "Sanada Yukimura (Bản sao 224)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Quý tộc",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sanada%20Yukimura%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1223"
  },
  {
    "id": "general-clone-224",
    "name": "Đường Thái Tông (Bản sao 225)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Binh lính",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90%C6%B0%E1%BB%9Dng%20Th%C3%A1i%20T%C3%B4ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1224"
  },
  {
    "id": "general-clone-225",
    "name": "Điêu Thuyền (Bản sao 226)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90i%C3%AAu%20Thuy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1225"
  },
  {
    "id": "general-clone-226",
    "name": "Sasaki Kojiro (Bản sao 227)",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Thương nhân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sasaki%20Kojiro%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1226"
  },
  {
    "id": "general-clone-227",
    "name": "Darius Đại đế (Bản sao 228)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Darius%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1227"
  },
  {
    "id": "general-clone-228",
    "name": "Alexander Đại đế (Bản sao 229)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1228"
  },
  {
    "id": "general-clone-229",
    "name": "Lã Bố (Bản sao 230)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%A3%20B%E1%BB%91%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1229"
  },
  {
    "id": "general-clone-230",
    "name": "Alexander Đại đế (Bản sao 231)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Quý tộc",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1230"
  },
  {
    "id": "general-clone-231",
    "name": "Hoàng Trung (Bản sao 232)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Trung%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1231"
  },
  {
    "id": "general-clone-232",
    "name": "Richard Tim Sư Tử (Bản sao 233)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Richard%20Tim%20S%C6%B0%20T%E1%BB%AD%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1232"
  },
  {
    "id": "general-clone-233",
    "name": "Phan Châu Trinh (Bản sao 234)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Học giả",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Phan%20Ch%C3%A2u%20Trinh%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1233"
  },
  {
    "id": "general-clone-234",
    "name": "Hoàng Hoa Thám (Bản sao 235)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Hoa%20Th%C3%A1m%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1234"
  },
  {
    "id": "general-clone-235",
    "name": "Date Masamune (Bản sao 236)",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Nông dân",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Date%20Masamune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1235"
  },
  {
    "id": "general-clone-236",
    "name": "Trần Nhân Tông (Bản sao 237)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20Nh%C3%A2n%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1236"
  },
  {
    "id": "general-clone-237",
    "name": "Triệu Vân (Bản sao 238)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tri%E1%BB%87u%20V%C3%A2n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1237"
  },
  {
    "id": "general-clone-238",
    "name": "Sasaki Kojiro (Bản sao 239)",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Nông dân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sasaki%20Kojiro%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1238"
  },
  {
    "id": "general-clone-239",
    "name": "Nguyễn Bỉnh Khiêm (Bản sao 240)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1239"
  },
  {
    "id": "general-clone-240",
    "name": "Richard Tim Sư Tử (Bản sao 241)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Tướng lĩnh",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Richard%20Tim%20S%C6%B0%20T%E1%BB%AD%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1240"
  },
  {
    "id": "general-clone-241",
    "name": "Winston Churchill (Bản sao 242)",
    "country": "Châu Âu",
    "era": "Cổ đại",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Winston%20Churchill%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1241"
  },
  {
    "id": "general-clone-242",
    "name": "Võ Nguyên Giáp (Bản sao 243)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20Nguy%C3%AAn%20Gi%C3%A1p%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1242"
  },
  {
    "id": "general-clone-243",
    "name": "Catherine Đại đế (Bản sao 244)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Catherine%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1243"
  },
  {
    "id": "general-clone-244",
    "name": "Lý Thái Tổ (Bản sao 245)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%BD%20Th%C3%A1i%20T%E1%BB%95%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1244"
  },
  {
    "id": "general-clone-245",
    "name": "Ngô Quyền (Bản sao 246)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ng%C3%B4%20Quy%E1%BB%81n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1245"
  },
  {
    "id": "general-clone-246",
    "name": "Lê Lợi (Bản sao 247)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Thợ thủ công",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20L%E1%BB%A3i%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1246"
  },
  {
    "id": "general-clone-247",
    "name": "Minamoto no Yoshitsune (Bản sao 248)",
    "country": "Nhật Bản",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Minamoto%20no%20Yoshitsune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1247"
  },
  {
    "id": "general-clone-248",
    "name": "Nguyễn Bỉnh Khiêm (Bản sao 249)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Hoàng gia",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1248"
  },
  {
    "id": "general-clone-249",
    "name": "Quang Trung (Bản sao 250)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Binh lính",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Quang%20Trung%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1249"
  },
  {
    "id": "general-clone-250",
    "name": "Uesugi Kenshin (Bản sao 251)",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Binh lính",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Uesugi%20Kenshin%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1250"
  },
  {
    "id": "general-clone-251",
    "name": "Hannibal Barca (Bản sao 252)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Binh lính",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Hannibal%20Barca%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1251"
  },
  {
    "id": "general-clone-252",
    "name": "Attila (Bản sao 253)",
    "country": "Thế giới",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Attila%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1252"
  },
  {
    "id": "general-clone-253",
    "name": "Lê Hoàn (Bản sao 254)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Binh lính",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Ho%C3%A0n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1253"
  },
  {
    "id": "general-clone-254",
    "name": "George Washington (Bản sao 255)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20George%20Washington%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1254"
  },
  {
    "id": "general-clone-255",
    "name": "Lã Bố (Bản sao 256)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Thương nhân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%A3%20B%E1%BB%91%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1255"
  },
  {
    "id": "general-clone-256",
    "name": "Timur (Bản sao 257)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Quý tộc",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Timur%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1256"
  },
  {
    "id": "general-clone-257",
    "name": "Bà Triệu (Bản sao 258)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Thương nhân",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A0%20Tri%E1%BB%87u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1257"
  },
  {
    "id": "general-clone-258",
    "name": "Sanada Yukimura (Bản sao 259)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sanada%20Yukimura%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1258"
  },
  {
    "id": "general-clone-259",
    "name": "Đường Thái Tông (Bản sao 260)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Nông dân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90%C6%B0%E1%BB%9Dng%20Th%C3%A1i%20T%C3%B4ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1259"
  },
  {
    "id": "general-clone-260",
    "name": "Frederick Đại đế (Bản sao 261)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Học giả",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Frederick%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1260"
  },
  {
    "id": "general-clone-261",
    "name": "Alexander Đại đế (Bản sao 262)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Hoàng gia",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1261"
  },
  {
    "id": "general-clone-262",
    "name": "Takeda Shingen (Bản sao 263)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Thương nhân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Takeda%20Shingen%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1262"
  },
  {
    "id": "general-clone-263",
    "name": "Thành Cát Tư Hãn (Bản sao 264)",
    "country": "Thế giới",
    "era": "Huyền thoại",
    "origin": "Tu sĩ",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Th%C3%A0nh%20C%C3%A1t%20T%C6%B0%20H%C3%A3n%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1263"
  },
  {
    "id": "general-clone-264",
    "name": "Minamoto no Yoshitsune (Bản sao 265)",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Hoàng gia",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Minamoto%20no%20Yoshitsune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1264"
  },
  {
    "id": "general-clone-265",
    "name": "Saladin (Bản sao 266)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Saladin%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1265"
  },
  {
    "id": "general-clone-266",
    "name": "Hoàng Trung (Bản sao 267)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Học giả",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Trung%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1266"
  },
  {
    "id": "general-clone-267",
    "name": "Date Masamune (Bản sao 268)",
    "country": "Nhật Bản",
    "era": "Cổ đại",
    "origin": "Quý tộc",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Date%20Masamune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1267"
  },
  {
    "id": "general-clone-268",
    "name": "Lã Bố (Bản sao 269)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%A3%20B%E1%BB%91%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1268"
  },
  {
    "id": "general-clone-269",
    "name": "Kusunoki Masashige (Bản sao 270)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Kusunoki%20Masashige%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1269"
  },
  {
    "id": "general-clone-270",
    "name": "Đường Thái Tông (Bản sao 271)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Thương nhân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90%C6%B0%E1%BB%9Dng%20Th%C3%A1i%20T%C3%B4ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1270"
  },
  {
    "id": "general-clone-271",
    "name": "Mã Siêu (Bản sao 272)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20M%C3%A3%20Si%C3%AAu%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1271"
  },
  {
    "id": "general-clone-272",
    "name": "Tào Tháo (Bản sao 273)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%C3%A0o%20Th%C3%A1o%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1272"
  },
  {
    "id": "general-clone-273",
    "name": "Quang Trung (Bản sao 274)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Quang%20Trung%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1273"
  },
  {
    "id": "general-clone-274",
    "name": "Lã Bố (Bản sao 275)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%A3%20B%E1%BB%91%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1274"
  },
  {
    "id": "general-clone-275",
    "name": "Horatio Nelson (Bản sao 276)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Hoàng gia",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Horatio%20Nelson%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1275"
  },
  {
    "id": "general-clone-276",
    "name": "Frederick Đại đế (Bản sao 277)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Thương nhân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Frederick%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1276"
  },
  {
    "id": "general-clone-277",
    "name": "Ngô Quyền (Bản sao 278)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Học giả",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ng%C3%B4%20Quy%E1%BB%81n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1277"
  },
  {
    "id": "general-clone-278",
    "name": "Xerxes (Bản sao 279)",
    "country": "Thế giới",
    "era": "Cận đại",
    "origin": "Học giả",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Xerxes%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1278"
  },
  {
    "id": "general-clone-279",
    "name": "Nguyễn Bỉnh Khiêm (Bản sao 280)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Nông dân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1279"
  },
  {
    "id": "general-clone-280",
    "name": "Võ Nguyên Giáp (Bản sao 281)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Hoàng gia",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20Nguy%C3%AAn%20Gi%C3%A1p%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1280"
  },
  {
    "id": "general-clone-281",
    "name": "Lê Lợi (Bản sao 282)",
    "country": "Việt Nam",
    "era": "Cổ đại",
    "origin": "Binh lính",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20L%E1%BB%A3i%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1281"
  },
  {
    "id": "general-clone-282",
    "name": "Triệu Vân (Bản sao 283)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Nông dân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tri%E1%BB%87u%20V%C3%A2n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1282"
  },
  {
    "id": "general-clone-283",
    "name": "Lê Thánh Tông (Bản sao 284)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Hoàng gia",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Th%C3%A1nh%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1283"
  },
  {
    "id": "general-clone-284",
    "name": "Võ Tắc Thiên (Bản sao 285)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Thợ thủ công",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20T%E1%BA%AFc%20Thi%C3%AAn%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1284"
  },
  {
    "id": "general-clone-285",
    "name": "Oda Nobunaga (Bản sao 286)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Tu sĩ",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Oda%20Nobunaga%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1285"
  },
  {
    "id": "general-clone-286",
    "name": "Thành Cát Tư Hãn (Bản sao 287)",
    "country": "Thế giới",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Th%C3%A0nh%20C%C3%A1t%20T%C6%B0%20H%C3%A3n%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1286"
  },
  {
    "id": "general-clone-287",
    "name": "Lê Hoàn (Bản sao 288)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Hoàng gia",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Ho%C3%A0n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1287"
  },
  {
    "id": "general-clone-288",
    "name": "Điêu Thuyền (Bản sao 289)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90i%C3%AAu%20Thuy%E1%BB%81n%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1288"
  },
  {
    "id": "general-clone-289",
    "name": "Lê Thánh Tông (Bản sao 290)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Th%C3%A1nh%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1289"
  },
  {
    "id": "general-clone-290",
    "name": "Nguyễn Bỉnh Khiêm (Bản sao 291)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Nguy%E1%BB%85n%20B%E1%BB%89nh%20Khi%C3%AAm%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1290"
  },
  {
    "id": "general-clone-291",
    "name": "Đinh Bộ Lĩnh (Bản sao 292)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Thương nhân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90inh%20B%E1%BB%99%20L%C4%A9nh%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1291"
  },
  {
    "id": "general-clone-292",
    "name": "Võ Nguyên Giáp (Bản sao 293)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20Nguy%C3%AAn%20Gi%C3%A1p%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1292"
  },
  {
    "id": "general-clone-293",
    "name": "Lê Thánh Tông (Bản sao 294)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Thương nhân",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Th%C3%A1nh%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1293"
  },
  {
    "id": "general-clone-294",
    "name": "Lưu Bị (Bản sao 295)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Thương nhân",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C6%B0u%20B%E1%BB%8B%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1294"
  },
  {
    "id": "general-clone-295",
    "name": "Lưu Bị (Bản sao 296)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C6%B0u%20B%E1%BB%8B%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1295"
  },
  {
    "id": "general-clone-296",
    "name": "Yi Sun-sin (Bản sao 297)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Học giả",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Yi%20Sun-sin%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1296"
  },
  {
    "id": "general-clone-297",
    "name": "Lý Thường Kiệt (Bản sao 298)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Nông dân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%BD%20Th%C6%B0%E1%BB%9Dng%20Ki%E1%BB%87t%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1297"
  },
  {
    "id": "general-clone-298",
    "name": "Tần Thủy Hoàng (Bản sao 299)",
    "country": "Trung Quốc",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20T%E1%BA%A7n%20Th%E1%BB%A7y%20Ho%C3%A0ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1298"
  },
  {
    "id": "general-clone-299",
    "name": "Miyamoto Musashi (Bản sao 300)",
    "country": "Nhật Bản",
    "era": "Hiện đại",
    "origin": "Hoàng gia",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Miyamoto%20Musashi%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1299"
  },
  {
    "id": "general-clone-300",
    "name": "Bà Triệu (Bản sao 301)",
    "country": "Việt Nam",
    "era": "Huyền thoại",
    "origin": "Thương nhân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A0%20Tri%E1%BB%87u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1300"
  },
  {
    "id": "general-clone-301",
    "name": "Saladin (Bản sao 302)",
    "country": "Thế giới",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Saladin%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1301"
  },
  {
    "id": "general-clone-302",
    "name": "Hannibal Barca (Bản sao 303)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Học giả",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Hannibal%20Barca%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1302"
  },
  {
    "id": "general-clone-303",
    "name": "Alexander Đại đế (Bản sao 304)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Quý tộc",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Alexander%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1303"
  },
  {
    "id": "general-clone-304",
    "name": "Hoàng Trung (Bản sao 305)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Hoàng gia",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Ho%C3%A0ng%20Trung%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1304"
  },
  {
    "id": "general-clone-305",
    "name": "Đường Thái Tông (Bản sao 306)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20%C4%90%C6%B0%E1%BB%9Dng%20Th%C3%A1i%20T%C3%B4ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1305"
  },
  {
    "id": "general-clone-306",
    "name": "Võ Tắc Thiên (Bản sao 307)",
    "country": "Trung Quốc",
    "era": "Cổ đại",
    "origin": "Tu sĩ",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20T%E1%BA%AFc%20Thi%C3%AAn%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1306"
  },
  {
    "id": "general-clone-307",
    "name": "Trần Nhân Tông (Bản sao 308)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Hoàng gia",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20Nh%C3%A2n%20T%C3%B4ng%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1307"
  },
  {
    "id": "general-clone-308",
    "name": "Khang Hy (Bản sao 309)",
    "country": "Trung Quốc",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Khang%20Hy%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1308"
  },
  {
    "id": "general-clone-309",
    "name": "Lý Thường Kiệt (Bản sao 310)",
    "country": "Việt Nam",
    "era": "Hiện đại",
    "origin": "Thương nhân",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%BD%20Th%C6%B0%E1%BB%9Dng%20Ki%E1%BB%87t%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1309"
  },
  {
    "id": "general-clone-310",
    "name": "Lê Hoàn (Bản sao 311)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Nông dân",
    "achievements": "Thống nhất đất nước",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20L%C3%AA%20Ho%C3%A0n%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1310"
  },
  {
    "id": "general-clone-311",
    "name": "Spartacus (Bản sao 312)",
    "country": "Châu Âu",
    "era": "Cận đại",
    "origin": "Thương nhân",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Spartacus%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1311"
  },
  {
    "id": "general-clone-312",
    "name": "Minamoto no Yoshitsune (Bản sao 313)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Binh lính",
    "achievements": "Chiến lược gia kiệt xuất",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Minamoto%20no%20Yoshitsune%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1312"
  },
  {
    "id": "general-clone-313",
    "name": "Timur (Bản sao 314)",
    "country": "Thế giới",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Viết nên tác phẩm để đời",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Timur%20Th%E1%BA%BF%20gi%E1%BB%9Bi%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1313"
  },
  {
    "id": "general-clone-314",
    "name": "Trương Phi (Bản sao 315)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Học giả",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%C6%B0%C6%A1ng%20Phi%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1314"
  },
  {
    "id": "general-clone-315",
    "name": "Võ Tắc Thiên (Bản sao 316)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20V%C3%B5%20T%E1%BA%AFc%20Thi%C3%AAn%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1315"
  },
  {
    "id": "general-clone-316",
    "name": "Charlemagne (Bản sao 317)",
    "country": "Châu Âu",
    "era": "Huyền thoại",
    "origin": "Thợ thủ công",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Charlemagne%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1316"
  },
  {
    "id": "general-clone-317",
    "name": "Peter Đại đế (Bản sao 318)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Quý tộc",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Peter%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1317"
  },
  {
    "id": "general-clone-318",
    "name": "Kusunoki Masashige (Bản sao 319)",
    "country": "Nhật Bản",
    "era": "Trung cổ",
    "origin": "Học giả",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Kusunoki%20Masashige%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1318"
  },
  {
    "id": "general-clone-319",
    "name": "Bà Triệu (Bản sao 320)",
    "country": "Việt Nam",
    "era": "Trung cổ",
    "origin": "Thợ thủ công",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20B%C3%A0%20Tri%E1%BB%87u%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1319"
  },
  {
    "id": "general-clone-320",
    "name": "Trần Hưng Đạo (Bản sao 321)",
    "country": "Việt Nam",
    "era": "Cận đại",
    "origin": "Học giả",
    "achievements": "Đánh bại quân xâm lược",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%20Vi%E1%BB%87t%20Nam%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1320"
  },
  {
    "id": "general-clone-321",
    "name": "Julius Caesar (Bản sao 322)",
    "country": "Châu Âu",
    "era": "Hiện đại",
    "origin": "Nông dân",
    "achievements": "Cứu vớt nhân loại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Julius%20Caesar%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1321"
  },
  {
    "id": "general-clone-322",
    "name": "Sasaki Kojiro (Bản sao 323)",
    "country": "Nhật Bản",
    "era": "Cận đại",
    "origin": "Nông dân",
    "achievements": "Phát minh vĩ đại",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Sasaki%20Kojiro%20Nh%E1%BA%ADt%20B%E1%BA%A3n%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1322"
  },
  {
    "id": "general-clone-323",
    "name": "Gia Cát Lượng (Bản sao 324)",
    "country": "Trung Quốc",
    "era": "Trung cổ",
    "origin": "Tu sĩ",
    "achievements": "Bảo vệ hòa bình",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Gia%20C%C3%A1t%20L%C6%B0%E1%BB%A3ng%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1323"
  },
  {
    "id": "general-clone-324",
    "name": "Trương Phi (Bản sao 325)",
    "country": "Trung Quốc",
    "era": "Huyền thoại",
    "origin": "Nông dân",
    "achievements": "Khám phá vùng đất mới",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Tr%C6%B0%C6%A1ng%20Phi%20Trung%20Qu%E1%BB%91c%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1324"
  },
  {
    "id": "general-clone-325",
    "name": "Catherine Đại đế (Bản sao 326)",
    "country": "Châu Âu",
    "era": "Trung cổ",
    "origin": "Binh lính",
    "achievements": "Lập nên đế chế",
    "image": "https://image.pollinations.ai/prompt/Epic%20portrait%20of%20Catherine%20%C4%90%E1%BA%A1i%20%C4%91%E1%BA%BF%20Ch%C3%A2u%20%C3%82u%20historical%20fantasy%20art%20style%20masterpiece?width=400&height=600&nologo=true&seed=1325"
  }
];
