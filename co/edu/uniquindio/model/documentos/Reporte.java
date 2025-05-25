package co.edu.uniquindio.model.documentos;

import co.edu.uniquindio.model.enums.EstadoReporte;
import co.edu.uniquindio.model.enums.EstadoSeveridad;
import co.edu.uniquindio.model.vo.HistorialEstado;
import co.edu.uniquindio.model.vo.Ubicacion;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "reportes")
public class Reporte {
    @Id
    private ObjectId id;
    private String titulo;
    private ObjectId idUsuario;
    
    @GeoSpatialIndexed
    private Ubicacion ubicacion;
    
    private EstadoReporte estadoReporte;
    private Categoria categoria;
    private List<Comentario> comentarios;
    private EstadoReporte solucionado;
    private List<String> fotos;
    private int numeroImportancia;
    private EstadoSeveridad severidad;
    private List<HistorialEstado> historial;
} 