CREATE DATABASE IF NOT EXISTS random_user;
USE random_user;

-- tabla usuarios 
CREATE TABLE IF NOT EXISTS USUARIOS (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    CORREO VARCHAR(100) UNIQUE NOT NULL,
    PAIS VARCHAR(50),
    FOTO VARCHAR(255)
);

-- tabla direccioens
CREATE TABLE IF NOT EXISTS DIRECCIONES (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    USUARIO_ID INT NOT NULL,
    CALLE VARCHAR(255),
    CIUDAD VARCHAR(100),
    ESTADO VARCHAR(100) ,
    CODIGO_POSTAL VARCHAR(20),
    FOREIGN KEY (USUARIO_ID) REFERENCES USUARIOS(ID) ON DELETE CASCADE
);

-- tabal auditoria
CREATE TABLE IF NOT EXISTS AUDITORIA_USUARIOS (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    USUARIO_ID INT NOT NULL,
    FECHA_HORA TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ACCION VARCHAR(50) NOT NULL,
    FOREIGN KEY (USUARIO_ID) REFERENCES USUARIOS(ID) ON DELETE CASCADE
);


-- insercion de datos en la tabla usuarios
INSERT INTO USUARIOS (NOMBRE, CORREO, PAIS, FOTO) VALUES
('Juan Pérez', 'juan.perez@example.com', 'México', 'juan.jpg'),
('Ana Gómez', 'ana.gomez@example.com', 'España', 'ana.jpg'),
('Carlos López', 'carlos.lopez@example.com', 'Argentina', 'carlos.jpg'),
('María Rodríguez', 'maria.rodriguez@example.com', 'Colombia', 'maria.jpg'),
('Luis Martínez', 'luis.martinez@example.com', 'Chile', 'luis.jpg') ;


--insercion datos en la tabla direcciones

INSERT INTO DIRECCIONES (USUARIO_ID, CALLE, CIUDAD, ESTADO, CODIGO_POSTAL) VALUES
(1, 'Calle 123', 'Ciudad de México', 'CDMX', '01000'),
(2, 'Avenida Principal 45', 'Madrid', 'Madrid', '28001'),
(3, 'Carrera 78', 'Buenos Aires', 'Buenos Aires', 'C1001'),
(4, 'Calle 10A', 'Bogotá', 'Cundinamarca', '110221'),
(5, 'Avenida Libertador 200', 'Santiago', 'Santiago', '8320000');



--vista para visualizar los usuarios con sus direcciones
CREATE VIEW VW_USUARIOS_CON_DIRECCIONES AS
SELECT 
    U.ID AS ID_USUARIO,
    U.NOMBRE,
    U.CORREO,
    U.PAIS,
    U.FOTO,
    D.ID AS ID_DIRECCION,
    D.CALLE,
    D.CIUDAD,
    D.ESTADO,
    D.CODIGO_POSTAL
FROM USUARIOS U
LEFT JOIN DIRECCIONES D ON U.ID = D.USUARIO_ID;



--procedimiento Almacenado
DELIMITER $$

CREATE PROCEDURE ObtenerUsuarioPorID(IN usuario_id INT)
BEGIN
    SELECT NOMBRE, CORREO, PAIS
    FROM USUARIOS
    WHERE ID = usuario_id;
END $$

DELIMITER ;

--trigger auditoria
DELIMITER $$

CREATE TRIGGER trigger_insert_usuario
AFTER INSERT ON USUARIOS
FOR EACH ROW
BEGIN
    INSERT INTO AUDITORIA_USUARIOS (USUARIO_ID, ACCION)
    VALUES (NEW.ID, 'INSERTADO');
END $$

DELIMITER ;
