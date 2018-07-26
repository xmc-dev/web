import { h } from 'preact';
import { Container } from 'semantic-ui-react';
import { Header } from '../../../components/page/components/header';
import { TaskInfo } from '../../../components/page/components/task-info';

export default function Problem() {
	return (
		<main>
			<Header
				title="Carte"
				subtitle="OJI 2017 - Clasa a VII-a"
				right={
					<TaskInfo
						items={[
							{
								label: 'Timp',
								value: '2s'
							},
							{
								label: 'Memorie',
								value: '8192 KB'
							},
							{
								label: 'Fisier de intrare',
								value: 'carte.in',
								monospace: true
							},
							{
								label: 'Fisier de iesire',
								value: 'carte.out',
								monospace: true
							},
							{
								label: 'Scor',
								value: '100'
							}
						]}
					/>
				}
			/>
			<Container>
				<h1>Cartee</h1>
				<p>
					În timpul activităților din “Săptămâna Altfel” elevii clasei a VII-a
					doresc să ajute la organizarea cărților din biblioteca școlii. Fiecare
					carte este etichetată cu un cod care este exprimat printr-un un șir de
					caractere distincte. Acestea pot fi cifrele <code>0, 1,..,9</code> și
					primele zece litere mici ale alfabetului englez <code>a, b,..,j</code>.
					Codul identifică în mod unic fiecare carte, adică nu vor exista două
					cărți cu același cod, dar şi genul literar din care acestea face
					parte. Cărțile din acelaşi gen literar au codul de identificare format
					din aceleaşi caractere, distincte, dispuse în altă ordine.
				</p>
				<p>
					Numim coduri pereche două coduri de identificare care au același număr
					de caractere și care diferă printr-un caracter. De exemplu, codurile{' '}
					<code>42a8</code> și <code>2c8a</code> sunt coduri pereche. Pe de altă
					parte, codurile <code>42a8</code> și <code>248a</code>, respectiv{' '}
					<code>42ab</code> și <code>248c</code>, nu sunt coduri pereche.
				</p>

				<h2>Cerinţă</h2>
				<p>
					Fiind dat șirul celor <code>N</code> coduri de identificare, scrieţi
					un program care să rezolve următoarele cerinţe:
				</p>
				<ol>
					<li>
						determină numărul de cărți din cel mai numeros gen literar și
						numărul de genuri literare care au acest număr maxim de cărți.
					</li>
					<li>
						determină numărul de coduri, din șirul celor <code>N</code>, care
						sunt coduri pereche cu ultimul cod din șir
					</li>
				</ol>

				<h2>Date de intrare</h2>
				<p>
					Fişierul de intrare <code>carte.in</code> conţine pe prima linie un
					număr natural <code>C</code>. Pentru toate testele, <code>C</code>{' '}
					poate lua numai valorile <code>1</code> sau <code>2</code>. Pe a doua
					linie se află numărul <code>N</code> de cărți din biblioteca școlii,
					iar pe următoarele <code>N</code> linii, câte un șir de caractere pe
					fiecare linie, ce reprezintă codul pentru identificarea unei cărți.
				</p>

				<h2>Date de ieșire</h2>
				<p>
					Dacă valoarea lui <code>C</code> este <code>1</code>, se va rezolva
					numai cerința 1. În acest caz, fişierul de ieşire{' '}
					<code>carte.out</code> conţine pe prima linie numărul maxim de cărți
					de același gen literar, <code>MAX</code>, iar pe a doua linie numărul
					de genuri literare care au exact <code>MAX</code> cărți.
				</p>
				<p>
					Dacă valoarea lui <code>C</code> este <code>2</code>, se va rezolva
					numai cerința 2. În acest caz, fişierul de ieşire{' '}
					<code>carte.out</code> conţine pe prima linie numărul de coduri
					pereche cu ultimul cod din șirul celor <code>N</code>.
				</p>

				<h2>Restricții și precizări</h2>
				<ul>
					<li>0 &lt; N &lt; 1 000 000</li>
					<li>
						Pentru rezolvarea corectă a primei cerințe se obțin 60 de puncte,
						iar pentru rezolvarea corectă a celei de a doua cerinţe se acordă 40
						de puncte
					</li>
				</ul>

				<h2>Exemplu</h2>
				<p>carte.in</p>
				<pre>
					1<br/>
					8<br/>
					1289f5<br/>
					128905<br/>
					129805<br/>
					219805<br/>
					12<br/>
					1e2<br/>
					12e<br/>
					e21<br/>
				</pre>

				<p>carte.out</p>
				<pre>
					3<br/>
					2
				</pre>

				<h2>Explicație</h2>
				<ul>
					<li>în prima zi citeşte paginile 1, 2</li>
					<li>în a doua zi citeşte paginile 3, 4, 5</li>
					<li>în a treia zi citeşte pagina 6</li>
					<li>în a patra zi citeşte paginile 7, 8, 9</li>
				</ul>
				<p>
					A terminat de citit cartea în 4 zile iar ziua 2 este prima zi în care
					a citit cele mai multe pagini (3).
				</p>
			</Container>
		</main>
	);
}
