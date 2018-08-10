import Util from './Util';


describe('Util.getWinner', () => {
  it('detects if X has won', () => {
    const gameArr = [
      1,1,1,
      0,0,0,
      -1,-1,0
    ];
    const [winner, winningLine] = Util.getWinner(gameArr);
    expect(winner).toBe(1);
    expect(winningLine).toEqual([0,1,2]);
  });

  it('detects if O has won', () => {
    const gameArr = [
      -1,1,1,
      0,-1,0,
      0,1,-1
    ];
    const [winner, winningLine] = Util.getWinner(gameArr);
    expect(winner).toBe(-1);
    expect(winningLine).toEqual([0,4,8]);
  });

  it('return null if no one has won', () => {
    const gameArr = [
      -1,1,1,
      0,-1,0,
      0,1,0
    ];
    const [winner, winningLine] = Util.getWinner(gameArr);
    expect(winner).toBe(null);
    expect(winningLine).toBe(null);
  });

});


describe('Util.randomNextMove', () => {

  it('returns move between >= 0 and < 9', () => {
    const gameArr = [
      0,0,0,
      0,0,0,
      0,0,0
    ];
    const move = Util.randomNextMove(gameArr);
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThan(9);
  });

  it('returns correct move when only one option', () => {
    const gameArr = [
      1,1,1,
      -1,-1,-1,
      1,1,0
    ];
    const move = Util.randomNextMove(gameArr);
    expect(move).toBe(8);

    const gameArr2 = [
      1,0,1,
      -1,-1,-1,
      1,1,-1
    ];
    const move2 = Util.randomNextMove(gameArr2);
    expect(move2).toBe(1);
  });

});


describe('Util.smartNextMove', () => {

  it('picks winning move', () => {
    const gameArr = [
      1,1,0,
      -1,-1,0,
      0,0,0
    ];
    const move = Util.smartNextMove(gameArr);
    expect(move).toBe(2);
  });

  it('picks best blocking move', () => {
    const gameArr = [
      1,1,0,
      -1,0,0,
      1,0,-1
    ];
    const move = Util.smartNextMove(gameArr);
    expect(move).toBe(2);
  });

});
