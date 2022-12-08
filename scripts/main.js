//Pink from BetaMindy
let cols = [Pal.lancerLaser, Pal.accent, Color.valueOf("cc6eaf")];

function addTable(table){
table.table(Tex.pane, t => {
let s = new Slider(0, 3, 1, false);
s.setValue(1);
let l = t.label(() => {
let v = s.getValue();
if(v == 0){
return "x0.5";
}else if(v == 1){
return "x1";
}else if(v == 2){
return "x2";
}else{
return "x4";
}
}).growX().width(42).color(Pal.accent);
let b = t.button(new TextureRegionDrawable(Icon.refresh), 18, () => s.setValue(1)).padLeft(0).get();
b.getStyle().imageUpColor = Pal.accent;
t.add(s).padLeft(2).minWidth(120) .height(42);
s.moved(v => {
let t = 1;
if(v == 0){
t = 0.5;
}else if(v == 1){
t = 1;
}else if(v == 2){
t = 2;
}else{
t = 4;
}
Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * t, 3 * t));
l.color(Tmp.c1.lerp(cols, (s.getValue() + 8) / 16));
});
});
table.visibility = () => {
if(!Vars.ui.hudfrag.shown || Vars.ui.minimapfrag.shown()) return false;
if(!Vars.mobile) return true;

    let input = Vars.control.input;
    return input.lastSchematic == null || input.selectPlans.isEmpty();
};

}

if(!Vars.headless){
var tc = new Table();

Events.on(ClientLoadEvent, () => {
    tc.bottom().left();
    addTable(tc);
    Vars.ui.hudGroup.addChild(tc);
    if(Vars.mobile) tc.moveBy(0, Scl.scl(46));
});

}
