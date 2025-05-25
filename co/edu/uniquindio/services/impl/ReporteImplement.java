import org.springframework.data.geo.Point;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.core.query.Criteria;
import java.util.List;
import java.util.stream.Collectors;

public class ReporteImplement {

    private void obtenerReportesUbicacion(UbicacionDTO ubicacionDTO){
        List<Reporte> reportes = reporteRepo.findAll();
    }

    /**
     * Método para obtener reportes dentro de un radio específico de una ubicación.
     *
     * @param ubicacionDTO Objeto DTO con la ubicación y el radio de búsqueda.
     * @return Lista de reportes encontrados dentro del radio especificado.
     */
    @Override
    public List<ReporteDTO> obtenerReportesUbicacion(UbicacionDTO ubicacionDTO) {
        // Crear el punto central para la búsqueda
        Point puntoCentral = new Point(ubicacionDTO.longitud(), ubicacionDTO.latitud());
        
        // Crear la distancia máxima
        Distance distancia = new Distance(ubicacionDTO.radio(), Metrics.METERS);
        
        // Ejecutar la consulta
        List<Reporte> reportes = reporteRepo.findByUbicacionNear(puntoCentral, distancia);
        
        // Convertir los reportes a DTOs
        return reportes.stream()
            .map(reporteMapper::toReporteDTO)
            .collect(Collectors.toList());
    }
} 