package hosteleria_proyect.api.utilities;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.github.cdimascio.dotenv.Dotenv;
import java.util.Date;

public class JWTUtils {
    public static String generateToken(int userId){
        String userId_string = String.valueOf(userId);
        Dotenv dotnev = Dotenv.load();

        return Jwts.builder()
                .setSubject(userId_string)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SignatureAlgorithm.HS512, dotnev.get("JWT_SECRET_KEY"))
                .compact();
    }

    public static int getIdFromToken(String token) {
        try {
            Dotenv dotenv = Dotenv.load();

            Claims claims = Jwts.parser()
                    .setSigningKey(dotenv.get("JWT_SECRET_KEY"))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return Integer.valueOf(claims.getSubject());

        } catch (Exception exception) {
            throw new RuntimeException("Invalid or expiredtoken");
        }
    }
}
