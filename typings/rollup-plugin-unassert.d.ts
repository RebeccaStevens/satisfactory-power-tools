declare module "rollup-plugin-unassert" {
  export default function (opts?: {
    include?: string[];
    exclude?: string[];
    sourcemap?: boolean;
  }): {
    name: string;
    transform(code: string, id: string): any;
  };
}
