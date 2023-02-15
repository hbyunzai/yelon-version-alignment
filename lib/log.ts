export function progress(received: any, total: any) {
  var percentage = ((received * 100) / total).toFixed(2);
  process.stdout.write(percentage + "% | " + received + " bytes fetched of " + total + " bytes.\n");
}