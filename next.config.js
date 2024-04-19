// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["res.cloudinary.com"]
//   }
// }

// module.exports = nextConfig


module.exports = {
  images: {
    domains: ["res.cloudinary.com"]
  },
  async headers() {
    return [
      {
        // Allow requests from a specific origin
        source: '/api/:path*', // Matches all API routes
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3000', // Adjust this to your frontend origin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS, PUT, PATCH, DELETE', // Allow the necessary HTTP methods
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization', // Allow the necessary headers
          },
        ],
      },
    ];
  },
};