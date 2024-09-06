class Producto 
{
    private codigo      : string
    private nombre      : string;
    private precio_costo: number;
    private precio_venta: number;

    constructor(codigo: string, nombre: string, precio_costo: number, precio_venta: number)
    {
        this.codigo       = codigo;
        this.nombre       = nombre;
        this.precio_costo = precio_costo;
        this.precio_venta = precio_venta;
    }
    public to_string(): string {
        return `Codigo: ${this.codigo} Nombre: ${this.nombre} Precio Costo: ${this.precio_costo} Precio Venta: ${this.precio_venta}`;
    }

    public getcodigo(): number {
        // P001 Se le quita la P dandonos 001 y lo regresamos
        let codigo_number: number = parseInt(this.codigo.split('P')[1]) 
        return codigo_number;
    }
}


class HashTable 
{
    private data: (Producto)[]; 
    private size: number; 

    constructor(size: number) 
    {
        this.size = size;
        this.data = new Array(size).fill(null); 
    }

    private hash(key: number): number 
    {
        return key % this.size; 
    }

    public insert(Producto: Producto): void {
        let index = this.hash(Producto.getcodigo());

        //Insertar mientras no este vacio, index es el codigo
        while (this.data[index] !== null) 
        {
            index = (index + 1) % this.size; //Le sumamos uno y lo dividimos de forma entera 
        }

        this.data[index] = Producto; 
    }

    public search(codigo: number): Producto | null 
    {

        let index = this.hash(codigo);
        // El index es el codigo hasheado para buscarlo nuevamente
        while (this.data[index] !== null) 
        {
            if (this.data[index]?.getcodigo() === codigo) 
            {
                return this.data[index]; 
            }
            index = (index + 1) % this.size;
        }

        return null; 
    }

    public print(): void {
        //Recorremos el array de productos
        console.log("Productos:");
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] !== null) {
                console.log(`${i}: ${this.data[i].to_string()}`);
            } 
            else 
            {
                console.log(`${i}: vacío`);
            }
        }
    }
}


function main() {
    let tablaHash = new HashTable(10);

    // codigo: string, nombre: string, precio_costo: number, precio_venta: number)
    let producto1 = new Producto("P001",  "Pepto-Bismol", 50, 65);
    let producto2 = new Producto("P002", "Ibuprofeno", 40, 45);
    let producto3 = new Producto("P003", "Hidrovida", 30, 35);
    let producto4 = new Producto("P004", "Enantyum", 20, 35);
    let producto5 = new Producto("P005", "Dolgenal", 35, 55);
    let producto6 = new Producto("P006",  "Pepto-Bismol", 50, 60);
    let producto7 = new Producto("P007", "Ibuprofeno", 40, 70);
    let producto8 = new Producto("P008", "Juan", 30, 35);
    let producto9 = new Producto("P009", "Enantyum", 20, 35);
    let producto10 = new Producto("P010", "Dolgenal", 35, 40);

    tablaHash.insert(producto10);
    tablaHash.insert(producto3);
    tablaHash.insert(producto7);
    tablaHash.insert(producto8);
    tablaHash.insert(producto5);
    tablaHash.insert(producto1);
    tablaHash.insert(producto4);
    tablaHash.insert(producto6);
    tablaHash.insert(producto2);
    tablaHash.insert(producto9);
    tablaHash.print();

    let codigo_producto = "P001";
    let buscar_producto = tablaHash.search(parseInt(codigo_producto.split('P')[1]));
    if (buscar_producto) 
    {
        console.log(`Producto encontrado: ${buscar_producto.to_string()}`);
    } 
    else 
    {
        console.log(`Producto con carnet ${codigo_producto} no encontrado.`);
    }
}

main();
