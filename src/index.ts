import {ConfigDefaults, CsvConfigConst, DataItem, Options} from "./constants";

// Export types for library consumers
export type { Options, DataItem } from "./constants";

export class SimpleCsv {
	public fileName: string | undefined;
	public labels: Array<string> | undefined;
	public data: DataItem[];

	private readonly _options: Options;
	private csv = "";

	constructor(DataJSON: DataItem[], filename: string, options?: Partial<Options>) {
		let config = options || {};

		this.data = typeof DataJSON != "object" ? JSON.parse(DataJSON) : DataJSON;

		// Validate data is an array
		if (!Array.isArray(this.data)) {
			throw new TypeError("Data must be an array");
		}

		this._options = Object.assign({}, ConfigDefaults, config);

		if (filename) {
			this._options.filename = filename;
		}

		this.generateCsv();
	}

	/**
	 * Generate and Download Csv
	 */
	private generateCsv(): any {
		// Handle empty data
		if (this.data.length === 0) {
			console.warn("No data to generate CSV");
			this.csv = "";
			if (this._options.noDownload) {
				return this.csv;
			}
			return;
		}

		if (this._options.useBom) {
			this.csv += CsvConfigConst.BOM;
		}

		if (this._options.showTitle) {
			this.csv += this._options.title + "\r\n\n";
		}

		if (this._options.useObjHeader && Object.keys(this._options.objHeader).length > 0) {
			this.getHeaderFromObj();
			this.getBodyAccordingHeader();
		} else {
			this.getHeaders();
			this.getBody();
		}

		if (this.csv == "") {
			console.log("Invalid data");
			return;
		}

		if (this._options.noDownload) {
			return this.csv;
		}

		let blob: Blob = new Blob([this.csv], {type: "text/csv;charset=utf8;"});

		let link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.setAttribute("target", "_blank");
		link.setAttribute("visibility", "hidden");
		link.download = this._options.filename.replace(/ /g, "_") + ".csv";

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	/**
	 * Create Headers
	 */
	getHeaders(): void {
		if (this._options.headers.length > 0) {
			const {headers} = this._options;
			let row = headers.reduce((headerRow, header) => {
				return headerRow + header + this._options.fieldSeparator;
			}, "");
			row = row.slice(0, -1);
			this.csv += row + CsvConfigConst.EOL;
		}
	}

	/**
	 * Create Header from Object
	 */
	getHeaderFromObj(): void {
		if (Object.keys(this._options.objHeader).length > 0) {
			let row = '';
			Object.keys(this._options.objHeader).forEach(key => {
				row += this._options.objHeader[key] + this._options.fieldSeparator;
			})
			row = row.slice(0, -1);
			this.csv += row + CsvConfigConst.EOL;
		}
	}

	/**
	 * Create Body according to obj header
	 */
	getBodyAccordingHeader(): void {
		for (let i = 0; i < this.data.length; i++) {
			let row = "";
			if (this._options.useObjHeader && Object.keys(this._options.objHeader).length > 0) {
				Object.keys(this._options.objHeader).forEach(key => {
					row += this.formatData(this.data[i][key]) + this._options.fieldSeparator;
				})
			}
			row = row.slice(0, -1);
			this.csv += row + CsvConfigConst.EOL;
		}
	}

	/**
	 * Create Body
	 */
	getBody() {
		for (let i = 0; i < this.data.length; i++) {
			let row = "";
			if (this._options.useHeader && this._options.headers.length > 0) {
				for (const index of this._options.headers) {
					row +=
						this.formatData(this.data[i][index]) + this._options.fieldSeparator;
				}
			} else {
				for (const index in this.data[i]) {
					// Check if the property is not inherited
					if (this.data[i].hasOwnProperty(index)) {
						row += this.formatData(this.data[i][index]) + this._options.fieldSeparator;
					}
				}
			}
			row = row.slice(0, -1);
			this.csv += row + CsvConfigConst.EOL;
		}
	}

	/**
	 * Format Data
	 * @param {any} data
	 */
	formatData(data: any) {
		if (
			this._options.decimalSeparator === "locale" &&
			SimpleCsv.isFloat(data)
		) {
			return data.toLocaleString();
		}

		if (this._options.decimalSeparator !== "." && SimpleCsv.isFloat(data)) {
			return data.toString().replace(".", this._options.decimalSeparator);
		}

		if (typeof data === "string") {
			data = data.replace(/"/g, '""');
			if (
				this._options.quoteStrings ||
				data.indexOf(this._options.fieldSeparator) > -1 ||
				data.indexOf("\n") > -1 ||
				data.indexOf("\r") > -1
			) {
				data = this._options.quoteStrings + data + this._options.quoteStrings;
			}
			return data;
		}

		if (typeof data === "boolean") {
			return data ? "TRUE" : "FALSE";
		}

		if (this._options.nullToEmptyString) {
			if (data === null || data === undefined) {
				return ("");
			}
		}

		return data;
	}

	/**
	 * Check if is Float
	 * @param {any} input
	 */
	static isFloat(input: any) {
		return +input === input && isFinite(input) && Boolean(input % 1);
	}
}

