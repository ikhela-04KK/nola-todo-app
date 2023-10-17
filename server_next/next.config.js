/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites(){
        return [
            // Rewrites all API request to your Express server
            {
                source: "https://9z8g5j-3000.csb.app/",
                // destination: "................/:path*",

            }
        ]
    }
}

module.exports = nextConfig
