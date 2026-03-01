import User from "../models/User.js";

// GET /api/users/me
export async function getMe(req, res) {
    try {
        const auth0Sub = req.auth.sub;

        let user = await User.findOne({ auth0Sub });

        // Auto-create user if first login
        if (!user) {
            user = await User.create({
                auth0Sub,
                xp: 0,
                league: "bronze"
            });
        }

        res.json(user);
    } catch (err) {
        console.error("User fetch error", err);
        res.status(500).json({ error: "Failed fo fetch user" });
    }
}