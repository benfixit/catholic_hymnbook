import { Category, CategoryType } from "@/typings";

export const categories: Array<CategoryType> = [
    {
        id: 1,
        title: "Entrance Hymns",
        slug: Category.ENTRANCE,
        hymns: [
            1, 8, 13, 15, 27, 66, 69, 71, 72, 75, 87, 91, 92, 103, 135, 137, 147, 149, 151, 154, 156, 160, 163,
            164, 178, 179, 181, 189, 213, 217, 275, 276, 307, 318, 319, 323, 337, 341, 343, 344, 346, 355, 357,
            373, 375, 376, 377, 379, 391, 392, 404, 416
        ]
    },
    {
        id: 2,
        title: "Offertory Hymns",
        slug: Category.OFFERTORY,
        hymns: [
            3, 11, 14, 19, 53, 54, 64, 94, 110, 112, 142, 161, 172, 215, 216, 226, 264, 301, 316, 353, 356, 362,
            364, 365, 399, 407, 409, 412, 413, 414, 421, 422, 425, 429, 433
        ]
    },
    {
        id: 3,
        title: "Communion Hymns",
        slug: Category.COMMUNION,
        hymns: [
            21, 25, 28, 32, 45, 46, 49, 52, 59, 67, 85, 96, 104, 108, 109, 124, 125, 143, 148, 153, 157, 165, 167, 168,
            169, 170, 175, 183, 186, 188, 198, 200, 212, 222, 225, 253, 263, 271, 272, 277, 282, 284, 285, 287, 293,
            305, 311, 313, 322, 330, 347, 350, 351, 352, 360, 363, 367, 370, 378, 380, 387, 389, 406, 410, 415, 424,
            426, 441, 443
        ]
    },
    {
        id: 4,
        title: "Recessional Hymns",
        slug: Category.RECESSIONAL,
        hymns: [
            9, 12, 47, 57, 78, 93, 99, 101, 102, 105, 122, 211, 219, 227, 245, 249, 258, 260, 261, 273, 274, 297, 299, 317,
            320, 321, 340, 361, 369, 381, 388, 417, 428, 432, 434
        ]
    },   
    {
        id: 5,
        title: "Advent Hymns",
        slug: Category.ADVENT,
        hymns: [
            68, 73, 81, 129, 267, 269, 371, 411, 427
        ]
    },
    {
        id: 6,
        title: "Christmas Hymns",
        slug: Category.CHRISTMAS,
        hymns: [
            4, 22, 23, 31, 40, 44, 62, 70, 84, 106, 114, 117, 138, 141, 152, 201, 224, 241, 265, 280,
            286, 304, 336, 342, 348, 374, 383, 400, 418, 435
        ]
    },
        {
        id: 7,
        title: "Lent Hymns",
        slug: Category.LENT,
        hymns: [
            17, 35, 48, 100, 111, 113, 196, 240, 248, 256, 266, 303, 312, 315, 332, 349, 390, 430
        ]
    },
    {
        id: 8,
        title: "Easter/Pentecost Hymns",
        slug: Category.EASTER,
        hymns: [
            34, 60, 61, 65, 133, 145, 159, 205, 230, 251, 257, 309, 339, 354, 398, 410, 438
        ]
    },
    {
        id: 9,
        title: "Latin Hymns",
        slug: Category.LATIN,
        hymns: [
            4, 5, 6, 7, 24, 33, 35, 37, 38, 39, 43, 83, 85, 118, 182, 187, 208, 209, 218, 231,
            270, 295, 296, 310, 311, 312, 328, 329, 331, 333, 334, 335, 366, 401, 402, 403
        ]
    },
    {
        id: 10,
        title: "Funeral Hymns",
        slug: Category.FUNERAL,
        hymns: [
            7, 82, 83, 107, 118, 150, 169, 187, 191, 208, 218, 231, 243, 290, 306, 314, 329, 335, 372,
            384, 439, 440
        ]
    },   
    {
        id: 11,
        title: "Mass for the dead - Latin Hymns",
        slug: Category.MASS_DEAD,
        hymns: [
            329, 208, 118, 83, 335, 7, 231, 218, 187
        ]
    },
    {
        id: 12,
        title: "Ordination/Priesthood Hymns",
        slug: Category.ORDINATION,
        hymns: [
            42, 86, 177, 220, 326, 443
        ]
    },
    {
        id: 13,
        title: "Our Lord Hymns",
        slug: Category.OUR_LORD,
        hymns: [
            10, 16, 20, 50, 58, 76, 128, 132, 145, 192, 193, 194, 197, 199, 204, 207, 281,
            288, 294, 359, 393, 395, 396, 422
        ]
    },   
    {
        id: 14,
        title: "Blessed Virgin Mary Hymns",
        slug: Category.BVM,
        hymns: [
            37, 30, 36, 38, 39, 56, 77, 89, 127, 130, 131, 158, 184, 185, 232, 233, 234, 235, 236,
            237, 242, 268, 289, 292, 327, 328, 333, 334, 397, 408, 442
        ]
    },
    //@todo start here
    {
        id: 15,
        title: "General Hymns",
        slug: Category.GENERAL,
        hymns: [
            2, 8, 18, 20, 26, 41, 51, 55, 63, 74, 79, 80, 88, 90, 95, 97,
            98, 115, 116, 119, 120, 121, 122, 123, 126, 136, 139, 140, 144,
            146, 155, 162, 166, 171, 173, 174, 176, 180, 190, 195, 202, 203,
            206, 210, 211, 214, 220, 221, 223, 228, 229, 238, 239, 244, 246, 247,
            250, 254, 255, 259, 262, 278, 279, 283, 291, 297, 298, 300, 302, 303,
            308, 315, 324, 325, 332, 338, 345, 358, 368, 382, 385, 386, 388, 390,
            405, 420, 431, 432, 436, 437
        ]
    },
    {
        id: 16,
        title: "Benediction Hymns",
        slug: Category.BENEDICTION,
        hymns: [
            145, 170, 175, 189, 252, 295, 297, 310, 311, 314, 363, 366
        ]
    },
    {
        id: 17,
        title: "Recollection Hymns",
        slug: Category.RECOLLECTION,
        hymns: [
            15, 29, 72, 103, 145, 170, 175, 177, 189, 204, 220, 297, 303,
            311, 314, 363, 382, 388, 429, 432, 443
        ]
    },
    {
        id: 18,
        title: "Thanksgiving Hymns",
        slug: Category.THANKSGIVING,
        hymns: [
            94, 121, 122, 123, 203, 297, 362, 385, 388, 394, 429, 432, 443
        ]
    },   
    {
        id: 19,
        title: "Psalms",
        slug: Category.PSALMS,
        hymns: [
            135, 428, 164, 375, 378, 380, 379, 219, 54, 222, 276, 165, 71, 
            53, 343, 157, 15, 21, 13, 27, 346, 253, 178, 161, 179, 416, 221,
            254, 272, 252, 355, 320
        ]
    }
];


export const ROMCAL_CATEGORIES_BRIDGE: Record<string, Category> = {
    CHRISTMAS_TIME: Category.CHRISTMAS, 
    ORDINARY_TIME: Category.GENERAL,
    LENT: Category.LENT,
    PASCHAL_TRIDUUM: Category.EASTER,
    EASTER_TIME: Category.EASTER,
    ADVENT: Category.ADVENT
}