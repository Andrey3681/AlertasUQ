package co.edu.uniquindio.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ubicacion {
    private double latitud;
    private double longitud;
    private double radio;

    public GeoJsonPoint toGeoJsonPoint() {
        return new GeoJsonPoint(longitud, latitud);
    }
} 