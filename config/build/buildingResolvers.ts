import webpack from "webpack";

export function buildingResolvers(): webpack.ResolveOptions {
   return {
      extensions: ['.tsx', '.ts', '.js']
   }
}