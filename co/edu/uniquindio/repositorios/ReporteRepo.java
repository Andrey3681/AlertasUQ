package co.edu.uniquindio.repositorios;

import co.edu.uniquindio.model.documentos.Reporte;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReporteRepo extends MongoRepository<Reporte, String> {
    
    /**
     * Encuentra reportes cercanos a un punto específico dentro de un radio máximo.
     *
     * @param punto Punto central de la búsqueda
     * @param distancia Distancia máxima en metros
     * @return Lista de reportes encontrados
     */
    List<Reporte> findByUbicacionNear(Point punto, Distance distancia);
} 