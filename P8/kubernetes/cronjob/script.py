from datetime import datetime, timezone, timedelta
import sqlite3

# Datos
carne = "202012039"
zona_horaria_gmt6 = datetime.now(timezone.utc) - timedelta(hours=6)
fecha_hora = zona_horaria_gmt6.strftime("%Y-%m-%d %H:%M:%S")

# Conexión a SQLite (se guarda dentro del pod)
conn = sqlite3.connect("/registro/registro.db")
cursor = conn.cursor()

# Crear tabla si no existe
cursor.execute("""
CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carne TEXT,
    fecha_hora TEXT
)
""")

# Insertar nuevo registro
cursor.execute("INSERT INTO registros (carne, fecha_hora) VALUES (?, ?)", (carne, fecha_hora))
conn.commit()
conn.close()

print(f"✅ Registro guardado: {carne} - {fecha_hora}")
